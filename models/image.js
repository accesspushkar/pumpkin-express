const sql = require("../db");
module.exports = { 
  saveImage: function(image,callback) {
    sql.query(`SELECT * FROM images WHERE name = '${image.name}'`, (err, res) => {
      let msg = "";
      let code = 400;
      if(err) throw err
        if(res.length > 1){
            msg = image.name + " already exist";
        }else{
            sql.query(`INSERT INTO images VALUES (UUID(), '${image.name}', '${image.path}', '${image.category}', 0, '${image.author}')`, (err, res) => {
                if (err) throw err;
            });
            msg = image.name+ "is uploaded successfully";
            code = 200;
        }
        return callback(msg, code)
    })
  },
  find: function(userId, result) {
    sql.query(`SELECT * FROM images WHERE author = '${userId}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
      return;
    });
  },
  findAll: function(result) {
    sql.query(`SELECT images.id, images.name, users.username, images.path, images.category, images.downloads  FROM images INNER JOIN users ON users.id = images.author`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
      return;
    });
  },
  updateDownloads: function(imageId, result) {
    sql.query(`UPDATE images SET downloads = downloads + 1 WHERE id = '${imageId}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
      return;
    });
  },
}