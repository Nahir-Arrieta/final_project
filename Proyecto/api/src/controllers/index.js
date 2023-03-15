const { Product } = require("../db");
const obj = require("../../Data.js");
const { Op } = require("sequelize");

const obj2 = obj.map((object) => {
  return {
    name: object.name,
    description: object.description.slice(0, 12),
    sellingPrice: object.selling_price,
    images: object.images.split("~"),
    average_rating: object.average_rating,
    sku: object.sku,
    category: object.category,
    // average_count: object.average_count,
  };
});
const getProducts = async () => {
  const products = await Product.findAll();
  if (products.length === 0) {
    const productDb = await Product.bulkCreate(obj2);
    return productDb;
  }
  return products;
};
const getSearch = async (name) => {
  console.log(name);
  try {
    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    return products;
  } catch (error) {
    return "Clothes not found";
  }
};

module.exports = {
  getProducts,
  getSearch,
};
