const path = require('path');
const fs = require('fs/promises');

// files-copy path
let filesCopy = path.join(__dirname, 'files-copy');

// create files-copy directory
fs.mkdir(filesCopy, {recursive : true}).then();


function removeDir(copyFilesPath) {
  fs.readdir(copyFilesPath, {withFileTypes : true}).then(value => {
    for (let file of value) {
      if (file.isDirectory()) {
        removeDir(path.join(copyFilesPath, file.name));
      } else {
        fs.unlink(path.join(copyFilesPath, file.name)).then();
      }
    }
  });
}

removeDir(filesCopy);

// copy files from files dir to files-copy dir
function copyFiles(filesPath, copyFilesPath) {
  fs.readdir(filesPath, {withFileTypes : true}).then(value => {
    for (let file of value) {

      if (file.isDirectory()) {
        fs.mkdir(path.join(filesCopy, file.name), {recursive : true}).then();
        copyFiles(path.join(filesPath, file.name), path.join(copyFilesPath, file.name));
      } else {
        fs.copyFile(path.join(filesPath, file.name), path.join(copyFilesPath, file.name)).catch((reason) => {
          throw reason;
        });
      }
    }
  });
}

copyFiles(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));