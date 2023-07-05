// sessionUtils.js

function getUserFromSession(req) {
    return req.session.user || null;
  }
  
  module.exports = {
    getUserFromSession
  };
  