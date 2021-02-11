const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGVnZW5kMTAiLCJhIjoiY2tqdW51OHQyMDE3MzJ6bGZmYzFybXB4byJ9.KpR46LODSGtm7tAbGviHiA&limit=1'

    request({ url: url, json: true }, (error, {body}) => {
       
        if(error) {
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to connect to location services', undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].geometry.coordinates[0],
                latitude: body.features[0].geometry.coordinates[1],
                location: body.features[0].place_name
                
            })
            
        }
    })
}
module.exports = geocode