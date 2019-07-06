const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3ViaGFtMTg2IiwiYSI6ImNqeG14cTVoeDA4c2gzZ282NjR6NHUybGoifQ.29FFbmHCPVk3oSsqX-aSfA&limit=1'

    request({ url : url, json : true }, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }
        else{
            callback(undefined,{
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode