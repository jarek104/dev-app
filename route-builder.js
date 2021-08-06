// Import the filesystem module
const fs = require('fs');
const path = require('path');

const obj = {
  routes: []
}
  
// Function to get current filenames
// in directory
const dirPath = path.join(__dirname, '/src/app/components');
const callback = () => console.log('done');

fs.readdir(dirPath, (err, files) => {
  if (err)
    console.log(err);
  else {
    console.log("\nCurrent directory filenames:");
    files.forEach(el => {
      obj.routes.push(el)
    })
    const json = JSON.stringify(obj);
    fs.writeFile('./src/assets/routes.json', json, 'utf8', callback); 
  }
})
  