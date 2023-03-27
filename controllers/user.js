const User = require("../models/user");
const sharp = require("../helper/processImage");
const fs = require("fs");

exports.GET = (req, res, next) => {};

exports.CREATE = (req, res, next) => {
  const inputFile = req.file;
  const inputPath = inputFile.path;
  const outputFolder = "./tmp/";

  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  const promises = [
    sharp.processImage(inputPath, outputFolder + "image_500.jpg", 500),
    sharp.processImage(inputPath, outputFolder + "image_1000.jpg", 1000),
  ];

  Promise.all(promises)
    .then((result) => {
      const Data = new User({
        nama: req.body.nama,
        tanggal: req.body.tanggal,
        usia: parseFloat(req.body.usia),
        mobile: req.body.mobile,
        city: req.body.city,
        education: req.body.education,
        image_500px: result[0],
        image_100px: result[1],
      });

      Data.save()
        .then((response) => {
          res.status(201).json({
            response,
          });
        })
        .catch((error) => res.json({ error }));
    })
    .catch((error) => res.json({ error }));
};

exports.EDIT = (req, res, next) => {};
