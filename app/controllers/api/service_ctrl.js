var numeral         = require('numeral');
var bcrypt          = require('bcrypt-nodejs');
var dateFormat      = require('dateformat');
var User            = require('../../models/user_model');
var formidable      = require('formidable');
var fs              = require('fs');
var nodemailer      = require('nodemailer');
var ejs             = require("ejs");
var mv              = require('mv');

exports.registration = function(req, res) {

    var baseUrl = req.protocol + '://' + req.headers['host'];

        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        if(err){

            res.json({status: "fail",message: err});
            return;

        }

        if (fields.username == '') {

            res.json({status: "fail",message: 'user name is required'});
            return;

        }

        if (fields.password == '') {

            res.json({status: "fail",message: 'passwordis required'});
            return;

        }

        if (fields.email == '') {

            res.json({status: "fail",message: 'email is required'});
            return;

        }

        

        User.findOne({'username': fields.username}, function(err, user) {

            if (err) throw err;
            if (user) {
                return res.json({ status: "fail", message: 'Username already registered'});
            }


            var profileImage = "";
            if (files.profileImage) {

                var oldpath = files.profileImage.path;
                var profileImage = "profile"+Date.now() + ".jpg";
                var newpath = './public/uploads/profile/' + profileImage;
                mv(oldpath, newpath, function(err) {
                    if (err) throw err;
                });
            } 

            User.findOne().sort([ ['_id', 'descending'] ]).exec(function(err, userdata) {

                var newUser = new User({

                    username        : fields.username,
                    email           : fields.email.toLowerCase(),
                    profileImage    : profileImage
                });

                newUser.password = newUser.generateHash(fields.password);
                newUser.token = newUser.authtoken();
                
                if (userdata) {
                newUser._id = userdata._id + 1;
                }
                // save the user
                newUser.save(function(err) {

                    if (err) {
                        res.json({ status: "fail", message: 'User could not be registered. PLease send all the required info and try again'});
                        return;
                    } else {

                        if (newUser.profileImage)
                            newUser.profileImage = baseUrl+"/uploads/profile/" + newUser.profileImage;

                      

                        res.json({'status':'success',data:newUser});
                        return;

                    }

                });
            });
        });
    });
}

exports.userLogin = function(req, res) {

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {

        let baseUrl         =   req.protocol + '://'+req.headers['host'];
        let username        =   fields.username;
        let password        =   fields.password;

        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        
        if (username == '') {

            res.json({status: "fail",message: 'user name is required'});
            return;

        } else if (password == '') {

            res.json({status: "fail",message: 'Password is required'});
            return;

        }
        User.findOne({ 'username': username}, function(err, user) {

            if (err) {
                res.status(500);
                res.json({ status: "fail",  message: err});
                return;

            } else if (!user) {

                res.json({status: "fail", message: 'Please enter valid username.'});
                return;

            } else if (!user.validPassword(password)) {

                res.json({status: "fail",message: 'Please enter valid password.' });
                return;

            }else {


                var test = user.authtoken();

                let data = {
                    authToken       : test,
                };

                User.update({_id: user._id}, {$set:data},function(err, docs) {

                    if (err) res.json(err);

                    user.authToken      =   test;
           
                    if (user.profileImage)
                        user.profileImage = baseUrl+"/uploads/profile/"+user.profileImage;

                    res.json({ status: "success", message: 'User authentication successfully done!', data: user});
                    return;
                });
            }

        });
    });
}
