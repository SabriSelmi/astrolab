module.exports={
    validVars : (variables) => {
        for (const variable of variables) {
            console.log("var", variable)
            if(!variable || variable == "undefined" || variable =="null" ){
                return false
            }
        }
        return true
    }
}