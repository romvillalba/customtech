const fs = require('fs');
const path = require('path');

const datos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../database/users.json')));

const cookieExiste = (req,res,next) => {
  if(!req.session.userLog && req.cookies.recordame) {
    const user = datos.find(row => row.email == req.cookies.recordame);
    delete user.contrasenia
    req.session.userLog = user

  }
  next()
}

module.exports = cookieExiste