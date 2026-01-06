const {User} = require("../../models/index")

const duplicateValidate = async (valueToCheck, key) => {
    const result = {
        status: true,
        validate: true,
        error: "",
    }
    try {
        const find = await User.findAll({where: {[key]: valueToCheck}});
        if (find.length > 0)
            result.validate = false
        return result
    } catch (error) {
        result.status = false
        result.error = error
        return result
    }
}

module.exports = {duplicateValidate}