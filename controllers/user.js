const User = require("../models/user");
const sharp = require("../helper/processImage");
const tmp = require("tmp");
const fs = require("fs");

exports.GET = (req, res, next) => {};
exports.CREATE = (req, res, next) => {
  const inputFile = req.file;
  const inputPath = inputFile.path;
  const outputFolder = tmp.dirSync().name; // Menggunakan modul tmp untuk membuat direktori temporary

  const promises = [
    sharp(inputPath)
      .resize(500)
      .toFile(path.join(outputFolder, "image_500.jpg")),
    sharp(inputPath)
      .resize(1000)
      .toFile(path.join(outputFolder, "image_1000.jpg")),
  ];

  Promise.all(promises)
    .then((result) => {
      const data = new User({
        nama: req.body.nama,
        tanggal: req.body.tanggal,
        usia: parseFloat(req.body.usia),
        mobile: req.body.mobile,
        city: req.body.city,
        education: req.body.education,
        image_500px: fs.readFileSync(path.join(outputFolder, "image_500.jpg")),
        image_100px: fs.readFileSync(path.join(outputFolder, "image_1000.jpg")),
      });

      data
        .save()
        .then((response) => {
          // Membersihkan direktori temporary setelah proses selesai
          fs.rmdirSync(outputFolder, { recursive: true });
          res.status(201).json({ response });
        })
        .catch((error) => res.json({ error }));
    })
    .catch((error) => res.json({ error }));
};

exports.EDIT = (req, res, next) => {};
