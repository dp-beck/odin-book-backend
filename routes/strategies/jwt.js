const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../../models/user");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'SECRET_KEY'; 

module.exports = new JwtStrategy(opts, async function(jwt_payload, done) {
   const user = await User.findOne({userName: jwt_payload.userName}).exec();
   if (user) {
    return done(null, user);
   }  
   return done(null, false);
});