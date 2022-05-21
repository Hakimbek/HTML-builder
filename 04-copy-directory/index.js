const path = require('path');
const fs = require('fs/promises');

// files path
let files = path.join(__dirname, 'files');

// files-copy path
let filesCopy = path.join(__dirname, 'files-copy');

// create files-copy directory
fs.mkdir(filesCopy, {recursive : true}).then();

// delete all files inside files-copy directory
fs.readdir(filesCopy, {withFileTypes : true}).then(value => {
  for (let file of value) {
    fs.unlink(path.join(filesCopy, file.name)).then();
  }
});

// copy files from files dir to files-copy dir
fs.readdir(files, {withFileTypes : true}).then(value => {
  for (let file of value) {
    let filePath = path.join(__dirname, 'files',file.name);
    let fileCopyPath = path.join(__dirname, 'files-copy', file.name);
    fs.copyFile(filePath, fileCopyPath).catch(reason => {
      throw reason;
    });
  }
});