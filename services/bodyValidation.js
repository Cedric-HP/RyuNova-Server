const bodyValidation = (req, entry) =>{
    const result = {
        status: true,
        message: [],
        entryData: {}
    }
    const param = entry.toLowerCase()
    const { name, role, status, quantity, integrity, unit, alertThreshold, planet, objective, lastMaintenance} = req.body
    switch(param) {
        case "crewmember": 
            if (!name || name === ""){
                result.status = false
                result.message.push("name")
            }
            else
                result.entryData.name = name
            if (
                !role || (
                role !== "engineer" && 
                role !== "pilot" && 
                role !== "scientist" && 
                role !== "officer"
                )
            ){
                result.status = false
                result.message.push("role")
            }
            else
                result.entryData.role = role
            if (
                !status || (
                status !== "active" && 
                status !== "onMission" && 
                status !== "injured" && 
                status !== "quarantine"
                )
            ){
                result.status = false
                result.message.push("status")
            }
            else
                result.entryData.status = status
            break
        case "module":
            if (!name || name === ""){
                result.status = false
                result.message.push("name")
            }
            else
                result.entryData.name = name
            if (
                !integrity ||
                integrity > 100 ||
                integrity < 0
            ){
                result.status = false
                result.message.push("integrity")
            }
            else {
                result.entryData.integrity = integrity
                if (integrity) {
                    let moduleStatus = "operational"
                    if (integrity < 10)
                        moduleStatus = "offline"
                    if(integrity >= 10 && integrity < 40)
                        moduleStatus = "degreded"
                    result.entryData.status = moduleStatus
                }
            }
            if (lastMaintenance)
                result.entryData.lastMaintenance = lastMaintenance
            break
        case "mission":
            if (!planet || planet === ""){
                result.status = false
                result.message.push("planet")
            }
            else
                result.entryData.planet = planet
            if (!objective || objective === ""){
                result.status = false
                result.message.push("objective")
            }
            else
                result.entryData.objective = objective
            if (
                !status || (
                status !== "planned" && 
                status !== "inProgress" && 
                status !== "returning" && 
                status !== "closed"
                )
            ){
                result.status = false
                result.message.push("status")
            }
            else
                result.entryData.status = status
            break
        case "resource":
            if (!name || name === ""){
                result.status = false
                result.message.push("name")
            }
            else
                result.entryData.name = name
            if (!unit || unit === ""){
                result.status = false
                result.message.push("unit")
            }
            else
                result.entryData.unit = unit
            if (!quantity || quantity < 0){
                result.status = false
                result.message.push("quantity")
            }
            else
                result.entryData.quantity = quantity
            if (!alertThreshold || alertThreshold < 0){
                result.status = false
                result.message.push("quantity")
            }
            else
                result.entryData.alertThreshold = alertThreshold
            break
    }
    return result
}

module.exports = {bodyValidation}