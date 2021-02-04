const rp = require('request-promise');

module.exports={
    // test an array of variables if they are valid
    validVars : (variables) => {
        for (const variable of variables) {
            if(!variable || variable == "undefined" || variable =="null" || variable == {} ){
                return false
            }
        }
        return true
    },
    // Get currencies values based on 1USD
    getCurrencies : async (req, res) =>{
        try {
            const result = await rp({
            uri : "https://api.currencyfreaks.com/latest?apikey="  + process.env.API_KEY,
            method : "GET"
            })
            const parsedRes = JSON.parse(result);
            const tnd_value = parsedRes.rates["TND"];
            const eur_value = parsedRes.rates["EUR"];
            res.status(200).json({
                tnd_value, eur_value
            })
        } catch (error) {
            console.log(error)
              res.status(500).json({
                error
            })
        }
    }
}