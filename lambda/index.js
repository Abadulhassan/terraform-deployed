const mysql = require('mysql2/promise');

exports.handler = async (event) => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  if (event.requestContext.http.method === "GET") {
    const [rows] = await conn.query("SELECT * FROM users");
    return { statusCode: 200, body: JSON.stringify(rows) };
  }

  if (event.requestContext.http.method === "POST") {
    const body = JSON.parse(event.body);
    await conn.query("INSERT INTO users(name,email) VALUES (?,?)",[body.name, body.email]);
    return { statusCode: 201, body: "User created" };
  }
};
