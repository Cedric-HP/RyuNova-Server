const { Tag } = require("../../models")

const tagFormat = (tagInput) => {
  const trimedImput = 
    tagInput.replaceAll("_", " ")
      .replaceAll("&", " ")
      .replaceAll("=", " ")
      .replaceAll("#", " ")
      .trim()
      .replace(/\s\s+/g, ' ')
      .normalize("NFD").replace(/\p{Diacritic}/gu, "")
      .toLowerCase()
    const rawTagList = trimedImput.split(" ")
    const filteredTagList = []
    rawTagList.forEach((item)=>{
      if(!filteredTagList.includes(item) && item !== "")
        filteredTagList.push(item)
    })
    let newTags = ""
    filteredTagList.forEach((item)=>{
      newTags += item + "_"
    })
    return newTags.slice(0, -1)
}

const tagHandler = async (rawTag, image) => {
    try{
        const tagList = tagFormat(rawTag).split("_")
        const tags = await Promise.all(
            tagList.map(async (name) => {
                const [tag] = await Tag.findOrCreate({
                    where: { name: name.toLowerCase().trim() }
                })
                return tag
            })
        )
        await image.setTagList(tags);
    } catch (error) {
        throw error
    }
}

module.exports = {tagHandler}