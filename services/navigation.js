const { Module, Resource } = require("../model");

const getEntityById = async (id, entity) => {
    const response = {status: true}
    try {
        const entityData = await entity.findByPk(id, { raw: true
        });
        if (!entityData) {
            response.status = false
            response.message = "Entity not found (find)"
            return response
        }
        response.data = entityData
        return response
    } catch (error) {
        response.status = false
        response.message = error.message
        return response
    }
}

const updateEntityById = async (id, data, entity) => {
    const response = {status: true}
    try {
        const [updated] = await entity.update(data, {
        where: { id: id },
        });
        if (!updated) {
            response.status = false
            response.message = "Entity not found (Up)"
            return response
        }
        return response
    } catch (error) {
        response.status = false
        response.message = error.message
        return response
    } 
}

const navigation = async (req, res) => {
    switch (req.params.mode) {
        case "move": {
            const { distanceAL } = req.body
            if (!distanceAL || distanceAL <= 0)
                return res.status(400).json({status: false, error: "distanceAl is invalid!"})
            const engineData = await getEntityById(1, Module)
            if(!engineData.status)
                return res.status(404).json({status: false, message: engineData.message})
            const fuelData = await getEntityById(1, Resource)
            if(!fuelData.status)
                return res.status(404).json({status: false, message: engineData.message})
            const consum = 2 * distanceAL
            const damage = 0.05 * distanceAL
            if (fuelData.data.quantity - consum <0) {
                const requireFuel = fuelData.data.quantity + ( fuelData.data.quantity - consum )
                return res.status(400).json({status: false, message: `Not Enougth fuel! Require ${fuelData.data.quantity}/${requireFuel}`, requireFuel: requireFuel})
            }
            if (engineData.data.integrity - damage < 10)
                return res.status(400).json({status: false, message: `Engine is too damaged do handle the journey or is already out!`})
            fuelData.data.quantity -= consum
            engineData.data.integrity -= damage
            let navValidate = await updateEntityById(1, engineData.data, Module)
            if (!navValidate.status)
                return res.status(404).json({status: false, message: navValidate.message})
            navValidate = await updateEntityById(1, fuelData.data, Resource)
            if (!navValidate.status)
                return res.status(404).json({status: false, message: navValidate.message})
            return res.status(201).json({status: true, message: `Moved ${distanceAL} AL`, deltas: {fuel: consum * -1, engineIntegrity: damage * -1}})
        }
        case "hyperspace-jump": {
                const { target, massFactor } = req.body
            if (!massFactor || massFactor <= 0)
                return res.status(400).json({status: false, error: "massFactor is invalid!"})
            if (!target|| target === "")
                return res.status(400).json({status: false, error: "target is invalid!"})
            const hyperDriveData = await getEntityById(3, Module)
            if(!hyperDriveData.status)
                return res.status(404).json({status: false, message: hyperDriveData.message})
            const energieData = await getEntityById(2, Resource)
            if(!energieData.status)
                return res.status(404).json({status: false, message: hyperDriveData.message})
            const consum = 120 * massFactor
            const rng = Math.floor(1 + Math.random() * 99)
            if (rng >= 90) {
                const damage = hyperDriveData.data.integrity * 0.05
                hyperDriveData.data.integrity -= damage
                if (hyperDriveData.data.integrity < 0)
                    hyperDriveData.data.integrity = 0
                return res.status(400).json({status: false, message: `Ion storm detected`, "impacts": { "HyperDriveIntegrity": damage * -1 } })
            }
            else {
                if (energieData.data.quantity - consum <0) {
                    const requireFuel = energieData.data.quantity + ( energieData.data.quantity - consum )
                    return res.status(400).json({status: false, message: `Not Enougth fuel! Require ${energieData.data.quantity}/${requireFuel}`, requireFuel: requireFuel})
                }
                energieData.data.quantity -= consum
                let navValidate = await updateEntityById(3, hyperDriveData.data, Module)
                if (!navValidate.status)
                    return res.status(404).json({status: false, message: navValidate.message})
                navValidate = await updateEntityById(2, energieData.data, Resource)
                if (!navValidate.status)
                    return res.status(404).json({status: false, message: navValidate.message})
                return res.status(201).json({status: true, deltas: {energie: consum * -1}})
            }
        }
        default:
            return res.status(404).json({status: false, message: "This action does't exist."})
    }
}

module.exports = {navigation}