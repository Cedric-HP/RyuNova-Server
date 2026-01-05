const { enitySelector } = require("./entitySelector");
const { bodyValidation } = require("./bodyValidation");

const updateEntity = async (req, res) => {
    const entity = enitySelector(req.params.entity)
    if (entity === undefined)
        return res.status(400).json({state: false, error: "'entity' params is undefied !"})
    const response = {state: true}
    const validBody = bodyValidation(req, req.params.entity)
    if (!validBody.status)
        response.message = `${validBody.message} are not valid`;
    try {
        const [updated] = await entity.update(validBody.entryData, {
            where: { id: req.params.id },
        });
        if (!updated) {
            return res.status(404).json({ status: false, error: "Entity not found!" });
        }
        const entiyUpdated = await entity.findByPk(req.params.id);
        response.data = entiyUpdated
        res.status(202).json(response);
    } catch (error) {
        res.status(400).json({ status: false, error: error.message });
    } 
};

module.exports = {updateEntity}