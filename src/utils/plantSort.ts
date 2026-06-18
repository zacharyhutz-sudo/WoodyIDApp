import plantsData from '../data/plants.json';

type F26Plant = {
  scientificName: string;
  family?: string;
  commonName: string;
  sortOrder?: number;
};

type F26Group = {
  id: string;
  name: string;
  plants: F26Plant[];
};

export type PlantLike = {
  id?: string;
  groupId?: string | number | null;
  scientificName?: string | null;
  family?: string | null;
  commonName?: string | null;
};

export function normalizePlantName(value: string | null | undefined): string {
  return String(value || '')
    .normalize('NFKC')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

const f26ByName = new Map<string, F26Plant & { groupId: string; groupName: string; sortOrder: number }>();

for (const group of plantsData as F26Group[]) {
  for (const plant of group.plants) {
    f26ByName.set(normalizePlantName(plant.scientificName), {
      ...plant,
      groupId: group.id,
      groupName: group.name,
      sortOrder: plant.sortOrder ?? Number.MAX_SAFE_INTEGER,
    });
  }
}

export function hasF26CurriculumPlant(plant: PlantLike): boolean {
  return f26ByName.has(normalizePlantName(plant.scientificName));
}

export type F26AppliedPlant<T extends PlantLike> = T & {
  groupId: string;
  scientificName: string;
  family?: string | null;
  commonName: string;
  sortOrder: number;
  active: true;
};

export function applyF26Curriculum<T extends PlantLike>(plants: T[]): Array<F26AppliedPlant<T>> {
  const applied: Array<F26AppliedPlant<T>> = [];

  for (const plant of plants) {
    const f26 = f26ByName.get(normalizePlantName(plant.scientificName));
    if (!f26) continue;

    applied.push({
      ...plant,
      // These are display-only overrides from the Fall 2026 lists.
      // They do not mutate the remote DB row, so existing pin coordinates,
      // row IDs, plant photos, and ID-feature details stay untouched.
      groupId: f26.groupId,
      scientificName: f26.scientificName,
      family: f26.family ?? plant.family,
      commonName: f26.commonName,
      sortOrder: f26.sortOrder,
      active: true as const,
    } as F26AppliedPlant<T>);
  }

  return applied;
}

export function groupSortKey(groupId: string | number | null | undefined): number {
  const parsed = Number(groupId);
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
}

export function plantSortKey(plant: { sortOrder?: number | null; scientificName?: string | null }): number {
  return typeof plant.sortOrder === 'number' ? plant.sortOrder : Number.MAX_SAFE_INTEGER;
}

export function sortPlantsByGroupOrder<T extends { groupId?: string | number | null; sortOrder?: number | null; scientificName?: string | null }>(plants: T[]): T[] {
  return plants.sort((a, b) => {
    const groupDiff = groupSortKey(a.groupId) - groupSortKey(b.groupId);
    if (groupDiff !== 0) return groupDiff;

    const orderDiff = plantSortKey(a) - plantSortKey(b);
    if (orderDiff !== 0) return orderDiff;

    return String(a.scientificName || '').localeCompare(String(b.scientificName || ''));
  });
}

export function sortGroupsByNumber<T extends { id?: string | number | null; name?: string | null }>(groups: T[]): T[] {
  return groups.sort((a, b) => {
    const idDiff = groupSortKey(a.id) - groupSortKey(b.id);
    if (idDiff !== 0) return idDiff;
    return String(a.name || '').localeCompare(String(b.name || ''));
  });
}
