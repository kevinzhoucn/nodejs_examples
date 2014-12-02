module.exports = {
  getIndex: function(req, res) {
    res.render('index');
  },
  
  signup: function(req, res) {
    nocklib.createUser(req.body.username
      , req.body.email
      , req.body.password, function(err, user) {
        console.log(user);
        res.redirect('/portfolio');
    });
  }
}