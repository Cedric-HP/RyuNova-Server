const fs = require('node:fs/promises');
const path = require('node:path');

// Create a helper function
const moveFile = async (oldPath, newPath) => {
  // 1. Create the destination directory if it does not exist
  // Set the `recursive` option to `true` to create all the subdirectories
  await fs.mkdir(path.dirname(newPath), { recursive: true });
  // 2. Rename the file (move it to the new directory)
  // Return the promise
  return fs.rename(oldPath, newPath);
}

module.exports = { moveFile }