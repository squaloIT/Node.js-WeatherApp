const request= require("request");

var geocodeAddress = (address) => {
    return new Promise((resolve, reject)=>{

        var encodedURI = encodeURIComponent(address);

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedURI}`,
            json: true
        }, (err, response, body)=>{
            if(err){
                reject(`Google API error`);
            } else if (body.status==="ZERO_RESULTS"){
                reject(`Unable to find that address`);
            } else if(body.status === "OVER_QUERY_LIMIT"){
                reject(body.error_message);
            } else if (body.status==="OK"){    
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });   
            } else if(body.status==="INVALID_REQUEST"){
                reject("Please enter address in right format.");
            } else {
                reject (body);
            }
        });
    });
    
};

geocodeAddress('11000').then((location)=>{
    console.log(JSON.stringify(location,undefined, 2));
}, (errorMessage)=>{
    console.log("Error:",errorMessage);
});