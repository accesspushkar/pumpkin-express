Router = require('express').Router()

const image = require("../controllers/image.js");

// upload image
Router.use("/upload", image.storeImage);
// download image
Router.use("/download/:id", image.download);
// Get user mages
Router.use("/getAll/:id", image.getAllForUser);
// get all images
Router.use("/getAll", image.getAll);

module.exports = Router;