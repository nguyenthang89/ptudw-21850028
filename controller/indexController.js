'use strict';

const controller  = {};

const models = require('../models');

controller.showHomepage = async (req, res) => {
  const recentProducts = await models.Product.findAll({
    attributes: ['id', 'name', 'imagePath', 'stars', 'price', 'oldPrice', 'createdAt'],
    order: [['createdAt', 'DESC']],
    limit: 10,
  });
  res.locals.recentProducts = recentProducts;

  const featuredProducts = await models.Product.findAll({
    attributes: ['id', 'name', 'imagePath', 'stars', 'price', 'oldPrice'],
    order: [['stars', 'DESC']],
    limit: 10,
  });
  res.locals.featuredProducts = featuredProducts;

  const categories = await models.Category.findAll();
  // [1, 2, 3, 4] => [[1], [3,4], [2]]
  const secondArray = categories.splice(2, 2);  
  const thirdArray = categories.splice(1, 1);
  res.locals.categoryArray = [categories, secondArray, thirdArray];
  const brands = await models.Brand.findAll();
  res.render('index', { brands }); // trả về 1 object brands lấy từ database, 
}

controller.showPage = (req, res, next) => {
  const pages = ['cart', 'checkout', 'contact', 'index', 'login', 'my-account', 'product-detail', 'product-list', 'wishlist', 'error'];
  if(pages.includes(req.params.page))
    return res.render(req.params.page); // trả về response là req.params.page, tùy logic :v 
    next();
}

module.exports = controller;
