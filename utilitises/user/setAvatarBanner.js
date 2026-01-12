const { deleteFileIfExists } = require("../../utilitises/fs/deleteFileIfExist");
const { deleteThumbnails } = require("../../utilitises/thumbnail/deleteThumbnails");
const {User, Image} = require("../../models");

const setAvatarBanner = async (imageCategory, userId, image) =>{
    const field = imageCategory === "avatar" ? "avatarUrl" : "bannerUrl";

    const user = await User.findByPk(userId);

    // Delete the old image if it exists
     if (user[field]) {
        const oldImage = await Image.findOne({
        where: {
            url: user[field],
            userId: user.id,
            imageCategory
      }
    });

    if (oldImage) {
        
      // Delete the files (full + thumbnails)
      await deleteFileIfExists(oldImage.url);

      await deleteThumbnails(oldImage.url, imageCategory)

      // supprimer en DB
      await oldImage.destroy();
    }
  }

  // 3️⃣ Mettre à jour l'utilisateur
  user[field] = image.url;
  await user.save();
}

module.exports = { setAvatarBanner }