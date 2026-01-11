const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const createThumbnail = async (imagePath, imageCategory, size) => {
    try {

        const filename = size+"_"+path.parse(imagePath).name;

        // Dynamic Thumbnail folder
        const thumbnailDir = path.join(
            "api",
            imageCategory, // "image" | "avatar" | "banner"
            "thumbnail"
        );

        // Create the folder if non-existent
        if (!fs.existsSync(thumbnailDir)) {
            fs.mkdirSync(thumbnailDir, { recursive: true });
        }

        const outputPath = path.join(
            thumbnailDir,
            `${filename}.webp`
        );

        // Generation of the thumbnail
        await sharp(imagePath)
        .resize( size, size, {
            fit: "cover",
            position: "centre"
        })
        .webp({
            quality: 80,
            effort: 4
        })
        .toFile(outputPath);
    
        return outputPath;
    } catch (error) {
        console.error("Sharp thumbnail generation failed:", error);
        throw error;
    }
}

module.exports = { createThumbnail }
