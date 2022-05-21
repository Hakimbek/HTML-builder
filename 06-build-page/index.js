const fs = require('fs');
const path = require('path');

/* HTML */

// create project-dist directory
fs.mkdir(path.join(__dirname, 'project-dist'), {recursive : true}, (err) => {
  if (err) throw err;
});

// create writer
let writer = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));

// read template.html file
fs.readFile(path.join(__dirname, 'template.html'), (err, data) => {
  // if file is not exist delete index.html file also
  if (err) {
    fs.readdir(path.join(__dirname, 'project-dist'), {withFileTypes : true}, (err, files) => {
      if (err) throw err;

      for (let file of files) {
        if (file.name === 'index.html') {
          fs.unlink(path.join(__dirname, 'project-dist', file.name), (err) => {
            if (err) throw err;
          });
        }
      }
    });
    return;
  }

  // get all tags
  let arr = data.toString().replace(/\r\n/g,'\n').split('\n');

  // tags before {{header}}
  let a = '';
  // tags after {{header}}, before {{articles}}
  let b = '';
  // tags after {{articles}}, before {{footer}}
  let c = '';
  // tags after {{footer}}
  let d = '';

  let count = 0;

  // get tags before {{header}}
  while (count < arr.length) {
    if (arr[count].trim() === '{{header}}') {
      count++;
      break;
    }
    a += arr[count] + '\n';
    count++;
  }

  // get tags after {{header}}, before {{articles}}
  while (count < arr.length) {
    if (arr[count].trim() === '{{articles}}') {
      count++;
      break;
    }
    b += arr[count] + '\n';
    count++;
  }

  // get tags after {{articles}}, before {{footer}}
  while (count < arr.length) {
    if (arr[count].trim() === '{{footer}}') {
      count++;
      break;
    }
    c += arr[count] + '\n';
    count++;
  }

  // tags after {{footer}}
  while (count < arr.length) {
    // console.log(arr[count]);
    d += arr[count] + '\n';
    count++;
  }

  // write tags into index.html file
  writer.write(a);
  fs.readFile(path.join(__dirname, 'components', 'header.html'), (err, data) => {
    if (err) throw err;
    writer.write(data + '\n');
    writer.write(b);

    fs.readFile(path.join(__dirname, 'components', 'articles.html'), (err, data) => {
      if (err) throw err;
      writer.write(data + '\n');
      writer.write(c);

      fs.readFile(path.join(__dirname, 'components', 'footer.html'), (err, data) => {
        if (err) throw err;
        writer.write(data + '\n');
        writer.write(d);
      });
    });
  });
});


/* Assets */

// create project-dist/assets directory
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive : true}, (err) => {
  if (err) throw err;
});

// create project-dist/assets/fonts directory
fs.mkdir(path.join(__dirname, 'project-dist', 'assets/fonts'), {recursive : true}, (err) => {
  if (err) throw err;
});

// create project-dist/assets/img directory
fs.mkdir(path.join(__dirname, 'project-dist', 'assets/img'), {recursive : true}, (err) => {
  if (err) throw err;
});

// create project-dist/assets/svg directory
fs.mkdir(path.join(__dirname, 'project-dist', 'assets/svg'), {recursive : true}, (err) => {
  if (err) throw err;
});

// delete all files inside fonts dir
fs.readdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), {withFileTypes : true}, (err, data) => {
  for (let file of data) {
    fs.unlink(path.join(__dirname, 'project-dist', 'assets', 'fonts', file.name), (err) => {
      if (err) throw err;
    });
  }
});

// delete all files inside img dir
fs.readdir(path.join(__dirname, 'project-dist', 'assets', 'img'), {withFileTypes : true}, (err, data) => {
  for (let file of data) {
    fs.unlink(path.join(__dirname, 'project-dist', 'assets', 'img', file.name), (err) => {
      if (err) throw err;
    });
  }
});

// delete all files inside svg dir
fs.readdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), {withFileTypes : true}, (err, data) => {
  for (let file of data) {
    fs.unlink(path.join(__dirname, 'project-dist', 'assets', 'svg', file.name), (err) => {
      if (err) throw err;
    });
  }
});

// copy fonts
fs.readdir(path.join(__dirname, 'assets', 'fonts'), {withFileTypes : true}, (err, data) => {
  if (err) throw err;

  for (let file of data) {
    fs.copyFile(path.join(__dirname, 'assets', 'fonts', file.name), path.join(__dirname, 'project-dist', 'assets', 'fonts', file.name), (err) => {
      if (err) throw err;
    });
  }
});


// copy img
fs.readdir(path.join(__dirname, 'assets', 'img'), {withFileTypes : true}, (err, data) => {
  if (err) throw err;

  for (let file of data) {
    fs.copyFile(path.join(__dirname, 'assets', 'img', file.name), path.join(__dirname, 'project-dist', 'assets', 'img', file.name), (err) => {
      if (err) throw err;
    });
  }
});

// copy svg
fs.readdir(path.join(__dirname, 'assets', 'svg'), {withFileTypes : true}, (err, data) => {
  if (err) throw err;

  for (let file of data) {
    fs.copyFile(path.join(__dirname, 'assets', 'svg', file.name), path.join(__dirname, 'project-dist', 'assets', 'svg', file.name), (err) => {
      if (err) throw err;
    });
  }
});


/* Style */

// create writer stream
let styleWriter = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

// create style.css
styleWriter.write('', (err) => {
  if (err) throw err;
});

// merge styles
fs.readdir(path.join(__dirname, 'styles'), {withFileTypes : true}, (err, data) => {
  if (err) throw err;

  for (let file of data) {
    if (path.extname('' + file.name) === '.css') {
      fs.createReadStream((path.join(__dirname, 'styles', file.name))).on('data', styles => {
        styleWriter.write(styles.toString());
      });
    }
  }
});