//import { GraphQLServer } from 'graphql-yoga'
// ... or using `require()`
const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch');

const typeDefs = `
type Geometry{
    coordinates:[String]
}

type Feature{
    geometry:Geometry
}

type Coords{
    features:[Feature]
} 

type Currently{
    summary:String
    icon:String
    temperature:Float
}

type Following{
    summary:String
    icon:String
    data:[Currently]
}

type Weather {
    currently:Currently
    hourly:Following
    daily:Following
}

  type Query {
    getCoords(query: String!): Coords!
    getWeather(lat: String!, long:String!): Weather
  }
`

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

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))