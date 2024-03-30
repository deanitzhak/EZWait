const globalData = require('../models/myUser.singleton');
const {PropertyNotFound} = require("../errors/NotFound.errors");

module.exports = {
    getUserData: (req, res) => {
      try{  const myUser = globalData.getData("myUser");
        if(!myUser) throw new PropertyNotFound("getUserData");
        res.status(200).send(myUser);
    }catch(err){
        res.status(404).send(err.message);
    }
    }
}
