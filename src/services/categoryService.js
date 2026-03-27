import { Region } from '../models/region.js';
import { LocationType } from '../models/locationType.js';

export const getAllRegions = async () => {
  return await Region.find();
};

export const getAllLocationTypes = async () => {
  return await LocationType.find();
};
