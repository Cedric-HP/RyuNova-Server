const {User} = require("../../models/index.js")
const { duplicateValidate } = require("../../utilitises/bodyValidation/duplicateValidation.js")

const checkDuplicate = async (req, res) =>{
    try {
        let type = req.query.type
        let value = req.query.value
        if(!type || !value) return res.status(400).json({state: false, message: "Missing querys"})
        type = type.toLowerCase();
        if(type !== "name" && type !== "email") return res.status(400).json({state: false, message: "Unknown Type"})
        if (type === "email") value = value.toLowerCase();
        try{
            const duplicate = await duplicateValidate(value, type)
            if (!duplicate.status) throw {message: duplicate.error }
            if (!duplicate.validate) return res.status(200).json({state: false, message: `${value} already exist!`})
            res.status(200).json({state: true, value: value})
        } catch (err) {
            throw {message : err}
        }
    } catch (error) {
        res.status(500).json({state: false, error: error.message });
  } 
}

module.exports = {checkDuplicate}