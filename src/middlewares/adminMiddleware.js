
const adminMiddleware = (req, res, next) => {

    if (!req.session.userLog || req.session.userLog.id_profile != 2) {
        return res.redirect('/login')
    } else {
        next();
    }


}


module.exports = adminMiddleware;