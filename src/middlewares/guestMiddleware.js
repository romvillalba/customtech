function guestMiddleware(req, res, next){
    if(req.session.userLog){
        return res.redirect('/perfil')
    }
    next()
}

module.exports = guestMiddleware;