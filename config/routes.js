var service         = require('../app/controllers/api/service_ctrl');


//you can include all your controllers

module.exports = function (app, passport) {

    /*Api*/
    app.post('/api/signUp', service.registration);
    app.post('/api/login', service.userLogin);
    

}
