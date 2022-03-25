let mongooseDB = require("mongoose");

mongooseDB.connect(
   "mongodb://localhost/logixboard",
   { useNewUrlParser: true },
   (error: any) => {
      if (error) {
         throw error;
      } else {
         console.log("Connected to MongoDB");
      }
   }
);

export default mongooseDB;
