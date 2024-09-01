import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required" });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.json({ error: "Already exists" });
    }

    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json();
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internet server error" });
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    res.json(removed);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internet server error" });
  }
});

const listCategory = asyncHandler(async (req, res) => {
  try {
    const allCategories = await Category.find({});
    res.json(allCategories);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
