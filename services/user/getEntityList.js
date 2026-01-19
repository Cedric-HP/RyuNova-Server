const { enitySelector } = require("./entitySelector");

const getEntityList = async (req, res) => {
    const entity = enitySelector(req.params.entity)
    if (entity === undefined)
        return res.status(400).json({status: false, error: "'entity' params is undefied !"})
    const limit = req.query.limit || 20
    const offset = req.query.offset * limit || 0
    try {
        const entityData = await entity.findAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
        });
        res.status(200).json({
            status: true, 
            data: entityData, 
            count: entityData.length, 
            pageInfo: {
                limit: limit, 
                offset: offset
            }
        });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
}

module.exports = { getEntityList }
