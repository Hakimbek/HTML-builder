const fs = require('fs/promises');
const path = require('path');

// secret-folder path
let secretFolder = path.join(__dirname, 'secret-folder'); 

// get data about dir
fs.readdir(secretFolder, {withFileTypes: true})
  .then(filenames => {
    // iterate each file
    for (let filename of filenames) {
      // check file
      if (filename.isFile()) {
        // get size
        fs.stat(secretFolder + '\\' + filename.name).then(value => {
          // print
          console.log(filename.name.split('.')[0] + ' - ' + path.extname(secretFolder + '\\' + filename.name) + ' - ' + value.size + ' byte');
        });
      }     
    }
  });