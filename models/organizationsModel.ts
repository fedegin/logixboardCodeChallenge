import mongooseDB from "../mongodb";

const organizationsSchema = new mongooseDB.Schema({
   type: {
      type: String,
      required: true
   },
   id: {
      type: String,
      required: true
   },
   code: {
      type: String,
      required: true
   }
});

module.exports = mongooseDB.model("organizations", organizationsSchema);
