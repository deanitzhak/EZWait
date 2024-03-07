const profile = require('../models/profile.model');
const profileRepository = require('../repository/profile.repository');
const profileService = require('../service/profileService');
const appRepo = new profileRepository(profile);
const Path = require('path'); // Ensure you have this required module if not already

module.exports = {
    getAllprofile: (req, res) => {
        appRepo.find()
            .then(profiles => {
                res.send(profiles);
            })
            .catch(err => {
                console.error("Error retrieving profile:", err);
                res.status(500).send("Internal server error");
            });
    },

    findAllByUserName: (req, res) => {
        appRepo.findByUserName(req.body.userName)
            .then(profiles => {
                res.send(profiles);
            })
            .catch(err => {
                console.error("Error retrieving profile:", err);
                res.status(500).send("Internal server error");
            });
    },

    findProfileByAppId: (req, res) => {
        appRepo.findProfileByAppId(req.body._id)
            .then(profile => {
                if (profile) {
                    res.send(profile);
                } else {
                    res.status(404).send("profile not found");
                }
            })
            .catch(err => {
                console.error("Error retrieving profile:", err);
                res.status(500).send("Internal server error");
            });
    },

    async findProfileByIdAndDelete(req, res) {
        try {
            await appRepo.findByIdAndDelete(req.query._id);
            res.status(200).send("Deleted");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    },

    async findAllProfileByType(req, res) {
        try {
            const profiles = await appRepo.findByType(req.query.status);
            res.status(200).send(profiles);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    },

    async submitNewProfile(req, res) {
        try {
            console.log("hey");
            const newApp = await profileService.createNewProfile(req.body);
            console.log("this is my profile : - >", newApp);
            appRepo.create(newApp);
            res.status(200).send("New client created successfully");

        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    },

    // Adding the serveFile function with the provided code
    serveFile: (req, res) => {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");

            switch (Path.extname(pathName)) {
                case ".js":
                    res.setHeader("Content-Type", "text/javascript");
                    break;
                case ".css":
                    res.setHeader("Content-Type", "text/css");
                    break;
                case ".html":
                    res.setHeader("Content-Type", "text/html");
                    break;
            }

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Content-Type", "text/plain");
            res.status(200);

            res.status(200);
            res.sendFile(Path.join(process.cwd() + "/Front" + pathName), (err) => {
                if (err) errorHandler(req, res, err);
            });
        } catch (err) {
            return errorHandler(req, res, err);
        }
    }
};
