const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./database");

async function launchServer() {
  const app = express();

  // Content-Type이 application/json인 HTTP요청의 body를 파싱할 수 있게 해줍니다.
  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.json({ message: "Hello CoronaBoard!" });
  });

  try {
    await sequelize.sync();
    // only for dev
    // sequelize.sync({ force: true });
    console.log("Database is ready!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error);
    process.exit(1);
  }

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
}

launchServer();
