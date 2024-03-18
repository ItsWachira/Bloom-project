const mongoose = require("mongoose");

const options = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 20000,
  socketTimeoutMS: 45000,
  family: 4,
  useNewUrlParser: true,
};

const DBConnect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, options);
    console.log("MongoDB connected...");

    // Middleware to track database operation response times
    mongoose.connection.on('commandStarted', (event) => {
      const startTime = Date.now();
      event.command.on('end', () => {
        const endTime = Date.now();
        const success = !event.command.failure;
        const operation = event.commandName;
        databaseResponseTimeHistogram.observe({ operation, success }, (endTime - startTime) / 1000);
      });
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default DBConnect;
