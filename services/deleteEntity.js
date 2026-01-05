const { enitySelector } = require("./entitySelector");

const deleteEntity = async (req, res) => {
    const entity = enitySelector(req.params.entity)
    if (entity === undefined)
        return res.status(400).json({status: false, error: "'entity' params is undefied !"})
    try {
        const deleted = await entity.destroy({
            where: { id: req.params.id },
        });
        if (!deleted) {
            return res.status(404).json({ status: false, error: "Entity not found" });
        }
        res.status(202).json({ status: true, message: "Entity successfully deleted" });
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }
};

module.exports = {deleteEntity}