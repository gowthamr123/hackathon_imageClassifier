const http = require('http');
const path = require("path");
const multer = require("multer");
const express = require("express");

const app = express();



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const hostname = 'localhost';
const port = 5000;


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})

//  const upload = multer({
//     storage: storage,
//     limits:{fileSize: 1000000},
//  }).single("myImage");

 // const router = express.Router();

//  app.get('/', (req, res) => res.send('Hello World!'))



 app.post("/upload", (req, res) => {
    var upload = multer({ storage: storage}).single('file');
    upload(req, res, async function(err) {
        // console.log('request file', req.file);
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        const classificationData = await getImageClassification(req.file.path);
        // console.log('result keywords', result);
        res.json({ classificationData: classificationData, filePath: req.file.path});

        // Display uploaded image for user validation
       // res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
    });
});


// const server = http.createServer((req, res) => {
// //   res.statusCode = 200;
// //   res.setHeader('Content-Type', 'text/plain');
// //   res.end('Hello World\n');
// quickstart();
// });



async function getImageClassification(filePath) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection(filePath);
    return result;
    
    // const labels = result.labelAnnotations;
    // console.log('Labels:', result);
   //  labels.forEach(label => console.log(label.description));
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
  