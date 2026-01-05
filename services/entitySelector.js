const { CrewMember, Module, Mission, Resource} = require('../model/index');

const enitySelector = (entry) => {
    const param = entry.toLowerCase()
    switch(param) {
        case "crewmember":
            return CrewMember
        case "module":
            return Module
        case "mission":
            return Mission
        case "resource":
            return Resource
        default:
            return undefined
    }
}

module.exports = { enitySelector }