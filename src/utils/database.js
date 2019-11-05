const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'Gfhjkm', 
{
    dialect: 'mysql',
    host: 'localhost',
});
module.exports = sequelize;

// JUST SQL
// const mysql  = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node_complete',
//     password: 'Gfhjkm'
// });

// module.exports = pool.promise();