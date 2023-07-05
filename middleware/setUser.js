// // Custom middleware to set the user property in req.session
const setUserMiddleware = (req, res, next) => {
  req.user = req.session.user || null; // Set user to null if not logged in

  // Access req.user and assign it to currentUserId
  const currentUserId = req.user ? req.user.id : null;

  // Attach currentUserId to the request object for further usage
  req.currentUserId = currentUserId;

  next();
};

module.exports = setUserMiddleware;
