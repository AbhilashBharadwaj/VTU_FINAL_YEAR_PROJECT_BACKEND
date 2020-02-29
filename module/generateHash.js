module.exports.generateHash = ()=>{
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = require('../model/app_config')
    
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);

    return hash

}