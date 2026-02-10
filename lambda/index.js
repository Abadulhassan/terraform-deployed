const mysql = require('mysql2/promise');

exports.handler = async (event) => {
  console.log("EVENT:", JSON.stringify(event));

  const method = event.httpMethod;   // <-- correct for your API

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  if (method === "GET") {
    const [rows] = await conn.query("SELECT * FROM users");
    return {
      statusCode: 200,
      body: JSON.stringify(rows)
    };
  }

  if (method === "POST") {
    const body = JSON.parse(event.body);
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
  
    await conn.query(
      "INSERT INTO users(name,email) VALUES (?,?)",
      [body.name, body.email]
    );

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User created" })
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Unsupported method" })
  };
};
