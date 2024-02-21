const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: "wrerwsksfmwkjADersfwesdfe",
  resave: false,
  saveUninitialized: false
}));
app.get('/',function(req,res){
    console.log(req);
    if(req.session.username){
        res.send(`hello, ${req.session.username}`)
    }else{
        res.send("you are not logged in ")
    }
})
app.get('/login', (req, res) => {
    req.session.username = 'rahul';
    console.log(req);
    res.send('Login Successful');
  });

app.get('/logout', (req, res) => {
    
  req.session.destroy(err => {
    console.log(req);
    if (err) {
      console.error('Error destroying session:', err);
      return;
    }
    res.send('Logout Successful');
  });
});
app.listen(3000,function(){
    console.log("server is listening");
})