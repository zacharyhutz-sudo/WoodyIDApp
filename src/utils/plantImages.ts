import approvedImages from '../data/approved_images.json';
import { normalizePlantName } from './plantSort';

type ApprovedImage = {
  scientificName: string;
  commonName?: string;
  imageUrl: string;
  sourcePage?: string;
  sourceName?: string;
  credit?: string;
  license?: string;
  reviewStatus?: string;
  reason?: string;
};

export type PlantWithImageFields = {
  scientificName?: string | null;
  commonName?: string | null;
  imageUrl?: string | null;
};

const approvedByScientificName = new Map<string, ApprovedImage>();

for (const image of approvedImages as ApprovedImage[]) {
  approvedByScientificName.set(normalizePlantName(image.scientificName), image);
}

export function getApprovedImage(plant: PlantWithImageFields): ApprovedImage | null {
  return approvedByScientificName.get(normalizePlantName(plant.scientificName)) ?? null;
}

export function resolvePlantImage<T extends PlantWithImageFields>(plant: T): T & {
  databaseImageUrl: string | null;
  approvedImageUrl: string | null;
  displayImageUrl: string | null;
  imageSourcePage: string | null;
  imageSourceName: string | null;
  imageCredit: string | null;
  imageLicense: string | null;
  imageReviewStatus: string;
  imageOverrideReason: string | null;
} {
  const approved = getApprovedImage(plant);
  const databaseImageUrl = plant.imageUrl || null;
  const approvedImageUrl = approved?.imageUrl || null;

  return {
    ...plant,
    // Keep the DB value visible for admin/export/debugging. Do not overwrite it.
    databaseImageUrl,
    approvedImageUrl,
    // Public UI should use this field first, then fall back to imageUrl if needed.
    displayImageUrl: approvedImageUrl || databaseImageUrl,
    imageSourcePage: approved?.sourcePage || null,
    imageSourceName: approved?.sourceName || null,
    imageCredit: approved?.credit || null,
    imageLicense: approved?.license || null,
    imageReviewStatus: approved?.reviewStatus || 'database_image',
    imageOverrideReason: approved?.reason || null,
  };
}

export function resolvePlantImages<T extends PlantWithImageFields>(plants: T[]) {
  return plants.map(resolvePlantImage);
}
