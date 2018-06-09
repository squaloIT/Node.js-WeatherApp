const request= require("request");

var geocodeAddress = (address, callback) => {
    var encodedURI = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`,
        json: true
    }, (err, response, body)=>{
        if(err){
            callback(`Google API error`);
        } else if (body.status==="ZERO_RESULTS"){
            callback(`Unable to find that address`);
        } else if(body.status === "OVER_QUERY_LIMIT"){
            callback(body.error_message);
        } 
        else if (body.status==="OK"){    
            callback(undefined,{
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });   
        } else if(body.status==="INVALID_REQUEST"){
            callback("Please enter address in right format.");
        } else {
            callback(undefined, body);
        }
    });
}

module.exports.geocodeAddress = geocodeAddress;