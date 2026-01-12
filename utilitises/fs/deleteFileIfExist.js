const fs = require("fs");

const deleteFileIfExists = async (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    await fs.promises.unlink(filePath);
  }
};

module.exports = { deleteFileIfExists };