/**
 * Validate JavaScript that Astro sends to browsers WITHOUT transpiling it.
 * In particular, define:vars implies is:inline: TypeScript assertions in those
 * blocks can pass a transpile-only check yet disable every homepage control.
 * No dependencies, network connection, or database credentials are required.
 */
import { readdir, readFile } from 'node:fs/promises';
import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Script } from 'node:vm';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const javascriptTypes = new Set([
  '', 'module', 'text/javascript', 'application/javascript',
  'text/ecmascript', 'application/ecmascript',
]);
let checked = 0;
let failed = 0;

async function* astroFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    if (entry.isDirectory()) yield* astroFiles(file);
    else if (entry.name.endsWith('.astro')) yield file;
  }
}

for await (const file of astroFiles(new URL('../src/', import.meta.url))) {
  const source = await readFile(file, 'utf8');
  // Blank frontmatter and template comments, preserving source line numbers.
  // Keep script contents intact: they are checked as written, not transpiled.
  const template = source.replace(/^---\r?\n[\s\S]*?\r?\n---/, text => text.replace(/[^\r\n]/g, ' '));
  const tags = /<!--[\s\S]*?-->|<script\b((?:"[^"]*"|'[^']*'|[^'">])*)>([\s\S]*?)<\/script\s*>/gi;
  for (const match of template.matchAll(tags)) {
    if (match[0].startsWith('<!--')) continue;
    const attributes = match[1].trim();
    const body = match[2];
    // Bare scripts and src-only scripts are processed by Astro as TypeScript.
    if (!attributes || /^src\s*=\s*(?:"[^"]*"|'[^']*')\s*$/.test(attributes)) continue;
    if (!body.trim()) continue;
    const type = attributes.match(/(?:^|\s)type\s*=\s*["']([^"']*)["']/i)?.[1].toLowerCase() || '';
    if (!javascriptTypes.has(type)) continue; // JSON/LD+JSON are data, not code.

    const name = relative(root, fileURLToPath(file));
    const bodyStart = match.index + match[0].indexOf(body);
    const lineOffset = source.slice(0, bodyStart).split('\n').length - 1;
    checked++;
    try {
      if (type === 'module') {
        const result = spawnSync(process.execPath, ['--input-type=module', '--check'], {
          input: body, encoding: 'utf8', timeout: 10000,
        });
        if (result.error) throw result.error;
        if (result.status !== 0) throw new SyntaxError(result.stderr.trim());
      } else {
        // vm.Script parses classic browser JavaScript without executing it.
        new Script(body, { filename: name, lineOffset });
      }
      console.log(`PASS ${name}:${lineOffset + 1} (unprocessed browser JavaScript)`);
    } catch (error) {
      failed++;
      console.error(`FAIL ${name}:${lineOffset + 1}\n${error.stack || error}`);
    }
  }
}

if (failed) {
  console.error(`\n${failed} of ${checked} browser script(s) failed. Build stopped before deployment.`);
  console.error('Scripts with define:vars or is:inline must contain JavaScript, not TypeScript.');
  process.exitCode = 1;
} else {
  console.log(`\nBrowser script syntax check passed (${checked} script(s)).`);
}
