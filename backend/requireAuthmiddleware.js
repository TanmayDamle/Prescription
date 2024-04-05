const requireAuth = (req, res, next) =>{
    // Check if the user is authenticated
    if (req.session && req.session.username) {
      // User is authenticated, proceed to the next middleware
      next();
    } else {
      // User is not authenticated, redirect to the login page or show an error message
      console.log('not valid session!!')
      res.redirect('/login');
    }
  };
  
module.exports = requireAuth;
  