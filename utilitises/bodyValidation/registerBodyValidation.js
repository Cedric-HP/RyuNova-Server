const { duplicateValidate } = require("./duplicateValidation");

const registerBodyValidation = async (req) =>{
    const result = {
        status: true,
        validate: true,
        message: [],
        error: "",
    }
    if (req.body.name === undefined || req.body.name === "") {
        result.validate = false
        result.message.push("Name is not valid");
    }
    else {
        const nameCheck = await duplicateValidate(req.body.name, "name")
        if (!nameCheck.status) {
            result.status = false
            return result.error = nameCheck.error
        }
        if (!nameCheck.validate) {
            result.validate = false
            result.message.push("Name already exist");
        }
    }
    
    if (req.body.email === undefined  || req.body.email === "") {
        result.validate = false
        result.message.push("Email is not valid");
    }
    else {
        const emailCheck = await duplicateValidate(req.body.email, "email")
        if (!emailCheck.status) {
            result.status = false
            return result.error = emailCheck.error
        }
        if (!emailCheck.validate) {
            result.validate = false
            result.message.push("Email already exist");
        }
    }
    if (req.body.password === undefined  || ( req.body.password.length < 8 || req.body.password.length > 100 )) {
        result.validate = false
        result.message.push("Password is not valid");
    } 
    return result
}

module.exports = {registerBodyValidation}