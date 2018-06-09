const yargs = require("yargs");
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a:{
            demand:true,
            alias:"address",
            descripe:"Adresa za koju ce se traziti vreme",
            string:true
        }
    }) 
    .help()
    .alias("help","h")
    .argv;

geocode.geocodeAddress(argv.a, (errorMessage, results) =>  {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        var address = results.address;
        weather.getWeather(results.latitude, results.longitude, 
            (errorMessage, results)=>{
                if(errorMessage){
                    console.log("Error: ",errorMessage);
                } else {
                    console.log(`
                    Summary for ${address}: 
                    ${results.summary}, 
                    tempeture: ${results.temperature},
                    real feel: ${results.apparentTemperature}`);
                }
            });
    }
});

