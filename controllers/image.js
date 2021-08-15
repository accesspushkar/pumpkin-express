const multer  = require('multer');
const util= require('./utils/imageUploader');
const Image= require('../models/image');

module.exports = {
   storeImage: function(req,res) {
        const upload = multer({storage: util.image.storage(),allowedImage: util.image.allowedImage}).single('file');
        upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
              res.send(err);
           } else if (err) {
              res.send(err);
           } else {
            const image = {
               name: req.body.name,
               path: req.file.filename,
               category: req.body.category,
               author: req.body.author,
            }
            Image.saveImage(image, function(result, code){
               console.log(result)
               res.status(code).send({message: result, code})
            })            
         }
      })        
   },
   getAllForUser: function(req, res) {
      if (!req.params.id) {
         res.status(400).send({
            message: "User id can not be empty!"
         });
      } else {
         Image.find(req.params.id, (err, data) => {
            if (err) {
               res.status(400).send({
                  message: "Error retrieving Images for userId " + req.params.id
               });
            } else {
               if (!data) {
                  res.status(200).send({
                        data: []
                  });     
               } else {
                  res.send(data);
               }
            }
         });
      }
   },
   getAll: function(req, res) {
      Image.findAll((err, data) => {
         if (err) {
            res.status(400).send({
               message: "Error retrieving Images"
            });
         } else {
            if (!data) {
               res.status(200).send({
                  data: []
               });     
            } else {
               res.send(data);
            }
         }
      });
   },
   download: function(req, res) {
      if (!req.params.id) {
         res.status(400).send({
            message: "Image id can not be empty!"
         });
      } else {
         Image.updateDownloads(req.params.id, (err, result) => {
            if (err) {
               res.status(400).send({
                  message: "Error updating downloads for imageId " + req.params.id
               });
            } else {
               res.send(result);
            }
         });
      }
   }
};
