const path = require('path');
const fs = require('fs');

let textPath = path.join(__dirname, 'text.txt');
let readStream = fs.createReadStream(textPath);
readStream.on('data', chunk => {
  let text = chunk.toString();
  console.log(text);
});
