require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const product = require("./models/Product");
const { count } = require("console");
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/products`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);
const modelDefiners = [product];

const modelCategory= require ("./models/Category")

const modelOrder= require ("./models/Order")
const modelProduct= require ("./models/Product")
const modelReview= require ("./models/Review")
const modelUser= require ("./models/User")

modelCategory(sequelize)

modelOrder(sequelize)
modelProduct(sequelize)
modelReview(sequelize)
modelUser(sequelize)

const {Category,Order,Product,Review,User} =sequelize.models;

Category.hasMany(Product)//una categoria muchos productos
Product.belongsTo(Category)//cada producto pertenece a una categoria

Order.belongsToMany(Product,{through:"Order_Product"})//una orden contiene muchos productos
Product.belongsToMany(Order, {through:"Order_Product"})//un producto puede pertenece4r a muchas ordenes

Product.hasMany(Review) //un producto puede tener muchas review
Review.hasOne(Product)// un review ouede pertenecer a un producto

Review.hasOne(User)
User.hasMany(Review)




fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);



module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
