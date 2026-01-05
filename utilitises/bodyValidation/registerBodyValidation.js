const { duplicateValidate } = require("./duplicateValidation");

const registerBodyValidation = async (req) =>{
    const result = {
        status: true,
        validate: true,
        message: [],
        error: "",
    }
    const {name, email} = req.body
    const nameCheck = await duplicateValidate(name, "name")
    if (!nameCheck.status) {
        result.status = false
        console.log({here: true}) 
        result.error = nameCheck.error
        return result
    }
    if (!nameCheck.validate) {
        result.validate = false
        result.message.push("Name already exist");
    }
    const emailCheck = await duplicateValidate(email, "email")
    if (!emailCheck.status) {
        result.status = false
        result.error = emailCheck.error
        return result
    }
    if (!emailCheck.validate) {
        result.validate = false
        result.message.push("Email already exist");
    }
    return result
}

module.exports = {registerBodyValidation}