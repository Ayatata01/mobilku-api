const multer = require("multer");

const tmpDir = "./tmp";
//Set up
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

//Filter jenis image yang diizinkan
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Membuat middleware untuk mengunggah file gambar
exports.upload = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
});
