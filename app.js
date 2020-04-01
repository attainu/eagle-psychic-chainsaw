var user = require("./controllers/users.js");


app.post("/user-signin", user.Controller.user_signin);
app.post("/user-signup", user.Controller.user_signup);
app.post("/user-delete", user.Controller.user_delete);
app.post("/user-update", user.Controller.user_update);
