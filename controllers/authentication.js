const AuthController = {};
AuthController.login = function(request, response) {
  var users = [
    {
      username: "sitanshu",
      password: "123"
    }
  ];
  var username = request.body.username;
  console.log(username);
  var password = request.body.password;
  console.log(password);
  var user = null;
  users.forEach(function(value, index) {
    if (value.username === username) {
      if (value.password === password) {
        user = value;
      }
    }
  });
  if (!user) {
    return response.send({
      status: false,
      message: "invalid credentials"
    });
  }
  request.session.user = user;
  return response.send({
    status: true,
    message: "logged in"
  });
};
AuthController.logout = function(request, response) {
  console.log("hi");
  var session = request.session;
  session.destroy();
  var cookie = request.cookies;
  //cookies.set('testtoken', {maxAge: Date.now()});

  for (var prop in cookie) {
    if (!cookie.hasOwnProperty(prop)) {
      continue;
    }
    response.cookie(prop, "", { expires: new Date(0) });
  }
  response.redirect("/");
};
AuthController.checkLogin = function(request, response, next) {
  if (request.originalUrl === "/login") {
    console.log(request.originalUrl);
    return next();
  }
  if (typeof request.session.user === "undefined") {
    return response.send({
      status: false,
      message: "unauthorized request"
    });
  } else {
    return next();
  }
};
module.exports = AuthController;
