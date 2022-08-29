const express = require('express');
const { Router } = express;
const log = require('../controllers/session')
const routerLog = Router();

//  INDEX
routerLog.get('/', log.getRoot);
//  LOGIN
routerLog.get('/login', log.getLogin);
routerLog.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), log.postLogin);
routerLog.get('/faillogin', log.getFaillogin);
//  SIGNUP
routerLog.get('/signup', log.getSignup);
routerLog.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), log.postSignup);
routerLog.get('/failsignup', log.getFailsignup);
//  LOGOUT
routerLog.get('/logout', log.getLogout);
// PROFILE
routerLog.get('/profileUser', log.getProfile);
routerLog.get('/ruta-protegida', log.checkAuthentication, (req, res) => {
    res.render('protected')
});
//  FAIL ROUTE
//log.get('*', );

module.exports = routerLog;