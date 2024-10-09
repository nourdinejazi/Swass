const express = require("express");
const multer = require("multer");
const path = require("path"); // Ensure to import the path module
const app = express();
// tell express to use '/media' path as static route
app.use("/media", express.static(path.resolve(__dirname, "./img")));
app.listen(3002, "localhost", (err) => {
  if (err) console.error(err);
  else console.info("Listening at http://localhost:3002");
});

// Set up the storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `./img`); // Specify the destination folder for uploads
  },
  filename: (req, file, callback) => {
    // Extract the original file name (without the extension)
    const originalName = path.parse(file.originalname).name;

    callback(
      null,
      `${originalName}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

app.post(
  "/media/produits",
  upload.array("images", 15),
  function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    if (req.files) {
      console.log(req.files);
      res.json({ path: "/" + req.files[0].path });
    } else {
      res.json({ success: false });
    }
  }
);
