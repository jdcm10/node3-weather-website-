const request = require('request')



const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=d3f6dd7d1fd0df54bbf9d17c17faf5cd&query=' + latitude + "," + longitude + '&units=f'

    request({ url, json: true}, (error, {body}) => {
        if(error) {
             callback("Unable to connect to weather service!", undefined)
        } else if(body.error) {
            callback('Unable to find location!', undefined)
        } else {
           callback(undefined, "The temperature is " + body.current.temperature +  'degreees. The current humidity is ' + body.current.humidity + '. And the observation time was at ' + body.current.observation_time)
        }
        
       
    })

}
   




module.exports = forecast 