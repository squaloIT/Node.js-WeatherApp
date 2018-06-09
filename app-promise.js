const yargs = require("yargs");
const axios = require("axios");

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

    
var encodedURI = encodeURIComponent(argv.address);
var geocodeURL= `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`;

axios.get(geocodeURL).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS')
        throw new Error("Unable to find that address.");
    
    var lat = response.data.results[0].geometry.location.lat;
    var long= response.data.results[0].geometry.location.lng;

    var weatherUrl = `https://api.darksky.net/forecast/622fe4004786b930977afa27fd32f0ae/${lat},${long}`;
    console.log(response.data.results[0].formatted_address);
    
    return axios.get(weatherUrl);

}).then((response)=>{
    var temperature = response.data.currently.temperature;
    var feelTemperature = response.data.currently.apparentTemperature;

    console.log(`Temperatura je: ${temperature}, ali je osecaj kao da je: ${feelTemperature}`);

}).catch((error)=>{
    if(error.code === 'ENOTFOUND')
        console.log('Unable to connect to API servers');
    else
        console.log(error.message);
});