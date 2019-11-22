module.exports = {
  ensureAuthentication: function(req, res, next) {
    if(req.isAuthenticated()){
      return next()
    }
    req.flash('error_msg', 'Não autorizado! Faça o login para ter acesso.')
    res.redirect('/users/login')
  }
}