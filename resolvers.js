const fetch = require('node-fetch');
const resolvers = {
    Query: {
        getCoords: (_, { query }) => {
            return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoiamdhdmlyMjMiLCJhIjoiY2pwMzMwanYwMDJkeTNwcDduODR5bXRlayJ9.p_HLVm6sK-X0d5-JIpSdxA`)
                .then(res => {
                    if (!res.ok) throw Error(res.status)
                    return res.json();
                })
                .catch(err => { throw err })
        },
        getWeather:(_, { lat,long }) => {
            return fetch(`https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/${lat},${long}`)
                .then(res => {
                    if (!res.ok) throw Error(res.status)
                    return res.json();
                })
                .catch(err => { throw err })
        }
    }
}
module.exports = resolvers;