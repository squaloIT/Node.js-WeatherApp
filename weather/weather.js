const request = require("request");

var getWeather = (lat, long, callback) => {

    request({
        url: `https://api.darksky.net/forecast/622fe4004786b930977afa27fd32f0ae/${lat},${long}`,
        type:'json'
    }, (err, response, body) => {
        
        if(!err && response.statusCode === 200){
            var bodyJS = JSON.parse(body);
            callback(undefined,{
                summary: bodyJS.currently.summary,
                temperature: bodyJS.currently.temperature,
                apparentTemperature:bodyJS.currently.apparentTemperature
            });
            
        } else {
            callback("Unable to fetch weather");
        }
    });
}

module.exports.getWeather = getWeather;