const sql = require("../db");

// constructor
const User = function(user) {
  this.email = user.email;
  this.username = user.username;
  this.type = user.type;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query(`INSERT INTO users VALUES (UUID(), '${newUser.username}', '${newUser.email}', '${newUser.password}', '${newUser.type}')`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByUsername = (username, result) => {
    sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res[0]);
      return;
    });
  };
  
User.findById = (userId, result) => {
    sql.query(`SELECT * FROM users WHERE id = '${userId}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res[0]);
      return;
    });
  };

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET email = ?, name = ?, active = ? WHERE id = ?",
    [user.email, user.name, user.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

module.exports = User;