const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'https://api.darksky.net/forecast/b57e661330b40c0f4b5dbe1b43756fdc/'+ encodeURIComponent(lat) + ',' + encodeURIComponent(long) + ''

    request({url, json : true}, (error, {body}) => {
        if(error){
            callback('Unable to connect', undefined)
        }
        else if(body.error){
            callback('Enter valid latitude and longitude, Unable to find location', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary +' It is currently ' + body.currently.temperature + ' degrees and chances of rain is ' + body.currently.precipProbability + '%')
        }
    })
}

module.exports = forecast