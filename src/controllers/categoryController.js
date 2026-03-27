import {
  getAllRegions,
  getAllLocationTypes,
} from '../services/categoryService.js';

export const getCategoriesWithRegions = async (req, res) => {
  const regions = await getAllRegions();
  res.status(200).json(regions);
};

export const getCategoriesWithLocationTypes = async (req, res) => {
  const locationTypes = await getAllLocationTypes();
  res.status(200).json(locationTypes);
};
