const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=9f304c6c0b701a994197545dc45bc811&query='+latitude+','+longitude+'&units=m'

    request({ url, json:true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        }else if (body.error) {
            callback('Unable to find location', undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+". It is currently "+body.current.temperature+" degrees out. but feelslike "+body.current.feelslike+" degrees."
            )
        }
    })
}

module.exports = forecast