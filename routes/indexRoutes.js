'use strict';

const express = require('express');
const controller = require('../controller/indexController');
const router = express.Router();

// router.get('/createTables', (req, res)=> {
//   let models = require('../models');
//   models.sequelize.sync().then(()=> {
//     res.send('tables created!');
//   });
// });

router.get('/', controller.showHomepage);
router.get('/:page', controller.showPage);

module.exports = router;