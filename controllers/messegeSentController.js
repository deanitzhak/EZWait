const MessegeSent= require('../models/messegeSent.model');
const MessegeSentRepository = require('../repository/messegeSent.repository');

module.exports = {
    getAllMessegeSent:(req,res) => {
        const messRepo = new MessegeSentRepository(MessegeSent);
        messRepo.findAll()
        .then(messegeSent => {
            res.send(messegeSent);
        })
        .catch(err => {
            res.send(err);
        })
    },
    findAllByUserName: (req, res) => {
        const messRepo = new MessegeSentRepository(MessegeSent);
        messRepo.findByUserName(req.body.userName)
        .then(messegeSent  => {
          res.send(messegeSent);
        }).catch(err => {
          res.send(err);
        })
      }
  
}