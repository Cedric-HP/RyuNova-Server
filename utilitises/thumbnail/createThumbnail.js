const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const thumbnailLists ={
    "image": [400, 750],
    "avatar": [30, 50, 55, 75, 200],
    "banner": [300, 750]
}

const handleThumbnail = async (imagePath, imageCategory) => {
    const thumbnailSizeList = thumbnailLists[imageCategory]
    for (const size of thumbnailSizeList) {
        await createThumbnail(imagePath, imageCategory, size)
    }
}

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

        const fitType = {
            "image": "outside",
            "avatar": "cover",
            "banner": "inside"
        }

        // Generation of the thumbnail
        await sharp(imagePath)
        .resize( size, imageCategory === "banner" ? null : size, {
            fit: fitType[imageCategory] || "outside",
            position: "center"
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

module.exports = { handleThumbnail }
