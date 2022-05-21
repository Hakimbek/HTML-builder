const { stdout, stdin } = process;
const fs = require('fs');
const path = require('path');

// output.txt path
let outputPath = path.join(__dirname, 'output.txt');

// create output.txt file
fs.writeFile(outputPath, '', err => {
  if (err) throw err;
  stdout.write('Message: Hello!\n');
});

// create stream writer
let writeStream = fs.createWriteStream(outputPath);

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Message: Bye!');
    process.exit();
  } else {
    writeStream.write(data.toString());
  }
});

// Handle Ctrl + C
process.on('SIGINT', function() {
  stdout.write('Message: Bye!');
  process.exit();
});