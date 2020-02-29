module.exports.generateHash = ()=>{
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = require('../model/app_config').password
    
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            // Store hash in your password DB.
            return hash
        });
    });
}