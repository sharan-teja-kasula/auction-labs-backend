import dbConnect from "./config/database";
import app from "./app";

const startApplication = async () => {
  try {
    await dbConnect();

    const port = Number(process.env.PORT || 4500);
    app.set("port", port);

    const server = require("http").createServer(app);

    server.listen(port);
    server.on("listening", () => {
      console.log("Server Running on Port  -->  " + port);
    });
  } catch (err) {
    console.log(err);
  }
};

startApplication();
