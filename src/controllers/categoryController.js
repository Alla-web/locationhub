import { Region } from '../models/region.js';
import { LocationType } from '../models/locationType.js';
import { Location } from '../models/location.js';

export const getCategoriesWithRegions = async (req, res) => {
  const usedRegionIds = await Location.distinct('regionId');

  //з фільтрацією тільки використовуваних в локаціях регіонів
  const regions = await Region.find({
    _id: { $in: usedRegionIds },
  })
    .sort({ region: 1 })
    .collation({ locale: 'uk', strength: 1 });

  res.status(200).json(regions);
};

export const getCategoriesWithLocationTypes = async (req, res) => {
  //з використанням тільки використовуваних в локаціях типів локацій
  const usedLocationTypeIds = await Location.distinct('locationTypeId');

  const locationTypes = await LocationType.find({
    _id: { $in: usedLocationTypeIds },
  })
    .sort({ type: 1 })
    .collation({ locale: 'uk', strength: 1 });

  res.status(200).json(locationTypes);
};
