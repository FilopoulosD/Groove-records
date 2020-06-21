module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');      
    },

    ensureAuthenticated2: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      return next();

    },
    forwardAuthenticated2: function(req, res, next) {
      if (!req.isAuthenticated2()) {
        return next();
      }
      //res.redirect('/artists');      
    }
  };