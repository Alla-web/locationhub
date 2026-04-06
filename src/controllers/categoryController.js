import { Region } from '../models/region.js';
import { LocationType } from '../models/locationType.js';

export const getCategoriesWithRegions = async (req, res) => {
  const regions = await Region.find()
    .sort({ region: 1 })
    .collation({ locale: 'uk', strength: 1 });

  res.status(200).json(regions);
};

export const getCategoriesWithLocationTypes = async (req, res) => {
  const locationTypes = await LocationType.find()
    .sort({ type: 1 })
    .collation({ locale: 'uk', strength: 1 });

  res.status(200).json(locationTypes);
};
