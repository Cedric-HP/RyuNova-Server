const fs = require("fs");
const path = require("path");

const deleteThumbnails = async (imageUrl, imageCategory) => {
  try {
    const thumbnailDir = path.join(
      "api",
      imageCategory,
      "thumbnail"
    );

    if (!fs.existsSync(thumbnailDir)) return;

    const baseName = path.parse(imageUrl).name;
    
    const files = await fs.promises.readdir(thumbnailDir);

    const thumbnailsToDelete = files.filter(file =>
      file.endsWith(`_${baseName}.webp`)
    );

    for (const file of thumbnailsToDelete) {
      await fs.promises.unlink(path.join(thumbnailDir, file));
    }
  } catch (err) {
    console.error("Thumbnail cleanup failed:", err);
  }
};

module.exports = { deleteThumbnails };