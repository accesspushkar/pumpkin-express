const User = require("../models/user");

module.exports = {
    login: function(req, res, next) {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }
        User.findByUsername(req.body.username, (err, user) => {
            if (err) {
                res.status(400).send({
                    message: "Error retrieving User with username " + req.body.username
                });
            } else {
                if (!user) {
                    res.status(200).send({
                        message: "User does not exist!"
                    });    
                } else if (user.password !== req.body.password) {
                    res.status(200).send({
                        message: "Password does not match!"
                    });    
                } else {
                    res.send(user);
                }
            };
        });
    },
    getOne: function(req, res, next) {
        if (!req.params.id) {
            res.status(400).send({
                message: "User id can not be empty!"
            });
        }
        User.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(400).send({
                    message: "Error retrieving User with userId " + req.body.userId
                });
            } else {
                if (!user) {
                    res.status(400).send({
                        message: "User does not exist!"
                    });     
                } else {
                    res.send(user);
                }
            }
        });
    },
    signUp: function(req, res, next) {
        if (!req.body) {
            res.status(400).send({
                message: "Contents can not be empty!"
            });
        }
        User.findByUsername(req.body.username, (err, user) => {
            if (err) {
                res.status(400).send({
                    message: "Error while checking if user exists with username " + req.body.username
                });
            } else {
                if (user) {
                    res.status(200).send({
                        message: "Username already taken!"
                    });     
                } else {
                    User.create({
                            username: req.body.username,
                            email: req.body.email,
                            password: req.body.password,
                            type: req.body.type
                        }, (err, result) => {
                        if (err) {
                            res.status(400).send({
                                message: "Error while creating user with username " + req.body.username
                            });
                        } else {
                            res.send({message: "Success"});
                        }
                    })
                }
            }
        });
    },
};
