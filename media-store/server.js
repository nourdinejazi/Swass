const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
// tell express to use '/media' path as static route
app.use("/media", express.static(path.resolve(__dirname, "./imgs")));
app.listen(3002, "localhost", (err) => {
  if (err) console.error(err);
  else console.info("Listening at http://localhost:3002");
});

// Set up the storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (!req.body.reference) {
      return callback("Reference is required");
    }
    const dynamicFolder = `./imgs/${req.body.reference}`; // Specify the destination folder for uploads
    // Create the directory if it does not exist
    fs.mkdir(dynamicFolder, { recursive: true }, (err) => {
      if (err) {
        return callback(err); // Handle error if directory creation fails
      }
      callback(null, dynamicFolder);
    });
  },
  
 
  filename: (req, file, callback) => {
    // Extract the original file name (without the extension)
    const originalName = path.parse(file.originalname).name;

    callback(null, `${originalName}${path.extname(file.originalname)}`);
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
    if (req.files && req.body.reference) {
      res.json({ path: "/" + req.files[0].path });
    } else {
      res.json({ success: false });
    }
  }
);
  const formatPath = (path) => {
    if (path.includes("/")) {
      return path.split("/")[path.split("/").length - 1];
    } else {
      return path;
    }
  };


app.patch(
  "/media/produits",
  upload.array("images", 15),
  function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    if (req.files && req.body.reference) {
      // console.log("fls", req.files);
      // console.log("body", req.body);
      const newFiles = [];
      for (let [key, value] of Object.entries(req.body))
        if (key.includes("exsistingimg")) {
          newFiles.push(value);
        }
      fs.readdir(
        `./imgs/${req.body.reference}`,
        (err, files) => {
          if (err) {
            console.error(err);
            return;
          }
          files.forEach((file) => {
            if (
              !newFiles.map((image) => formatPath(image)).includes(file) &&
              !req.files.map((image) => image.filename).includes(file)
            ) {
              fs.unlink(`./imgs/${req.body.reference}/${file}`, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
              });
            }
          });
        }
      );

      res.json({ path: "doneee" });
    } else {
      res.json({ success: false });
    }
  }
);
