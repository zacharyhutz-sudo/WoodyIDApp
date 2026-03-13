import { c as createComponent } from './astro-component_CDWWFvb5.mjs';
import 'piccolore';
import { e as addAttribute, j as renderHead, k as renderSlot, r as renderTemplate } from './ssr-function_DuAdq3-t.mjs';
import 'clsx';

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Woody ID</title>${renderHead()}</head> <body class="flex flex-col min-h-screen" data-astro-cid-sckkx6r4> <div class="flex-grow" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </div> <footer class="py-8 bg-stone-100 border-t border-stone-200" data-astro-cid-sckkx6r4> <div class="max-w-4xl mx-auto px-4 text-center" data-astro-cid-sckkx6r4> <a href="/admin" class="text-xs font-medium text-stone-400 hover:text-stone-600 transition-colors" data-astro-cid-sckkx6r4>Admin Login</a> </div> </footer></body></html>`;
}, "/Users/sam/projects/WoodyIDApp/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
