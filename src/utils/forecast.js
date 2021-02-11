const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a81f9a432f57d8910697d50c92c869fc&query=' + latitude + ',' + longitude + '&units=f';
 
    request({ url: url, json: true }, (error,{ body }) => {
  
        if(error) {
           
            callback("Not found", undefined)
        } else if (body.error) {
            
            callback("Not found", undefined)
    
        } else {
            
            callback(undefined, body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature+ ' out. But feels like ' + body.current.feelslike+'. (in fahrenheit) ')
         
        }
    })
}


module.exports = forecast
