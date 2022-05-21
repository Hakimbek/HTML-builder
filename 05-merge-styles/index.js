const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

// styles path
let styles = path.join(__dirname, 'styles');

// project-dist path
let projectDist = path.join(__dirname, 'project-dist');

// create writer stream
let writer = fs.createWriteStream(path.join(projectDist, 'bundle.css'));

// create bundle.css
writer.write('');

// merge styles
fsPromises.readdir(styles, {withFileTypes : true}).then(value => {
  for (let file of value) {
    if (path.extname('' + file.name) === '.css') {
      fsPromises.readFile(path.join(styles, file.name)).then(style  => {
        writer.write(style.toString());
      });
    }
  }
});
