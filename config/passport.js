module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;

  // Local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email'
    },
    function (username, password, done) {
      User.findOne({where: {email:username}}).then(function(user) {
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'Bad username or password'
          });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Bad username or password'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      }).catch(function(err){
        if (err) {
          return done(err);
        }
      });
    }
  ));

  // facebook strategy
  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      passReqToCallback: true,
      callbackURL: '/api/user/auth/facebook/callback'
    },
    function(req, accessToken, refreshToken, profile, done){
      console.log('Profile: ',profile);
      // run asynchronous
      /*process.nextTick(function(){
        console.log('User: ', req.user);*/
        return done({message: 'Errror'});
      /*});*/
      console.log('doene');
    }
  ));
}