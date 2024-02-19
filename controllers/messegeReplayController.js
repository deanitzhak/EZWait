const MessegeReplay = require('../models/messegeReplay.model');
const MessegeReplayRepository = require('../repository/messegeReplay.repository');

module.exports = {
    getAllMessegeReplay:(req,res) => {
        const messRepo = new MessegeReplayRepository(MessegeReplay);
        messRepo.findAll()
        .then(messegeReplay => {
            res.send(messegeReplay);
        })
        .catch(err => {
            res.send(err);
        })
    },
    findAllByUserName: (req, res) => {
        const messRepo = new MessegeReplayRepository(MessegeReplay);
        messRepo.findByUserName(req.body.userName)
        .then(messegeReplay  => {
          res.send(messegeReplay);
        }).catch(err => {
          res.send(err);
        })
      }
  
}