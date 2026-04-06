import { Region } from '../models/region.js';
import { LocationType } from '../models/locationType.js';
// import { Location } from '../models/location.js';

export const getCategoriesWithRegions = async (req, res) => {
  // const usedRegionIds = await Location.distinct('regionId');

  // const regions = await Region.find({
  //   _id: { $in: usedRegionIds },
  // })
  const regions = await Region.find()
    .sort({ region: 1 })
    .collation({ locale: 'uk', strength: 1 });

  res.status(200).json(regions);
};

export const getCategoriesWithLocationTypes = async (req, res) => {
  // const usedLocationTypeIds = await Location.distinct('locationTypeId');

  // const locationTypes = await LocationType.find({
  //   _id: { $in: usedLocationTypeIds },
  // })
  const locationTypes = await LocationType.find()
    .sort({ type: 1 })
    .collation({ locale: 'uk', strength: 1 });

  res.status(200).json(locationTypes);
};
