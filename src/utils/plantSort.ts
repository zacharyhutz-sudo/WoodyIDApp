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

export function isActivePlant(plant: { active?: boolean | number | null | undefined }): boolean {
  return plant.active !== false && plant.active !== 0;
}
