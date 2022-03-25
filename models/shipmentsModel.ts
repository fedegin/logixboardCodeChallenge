import mongooseDB from "../mongodb";

const shipmentsSchema = new mongooseDB.Schema({
   type: {
      type: String,
      required: true
   },
   referenceId: {
      type: String,
      required: true
   },
   organizations: {
      type: Array,
      Default: []
   },
   estimatedTimeArrival: {
      type: Date
   },
   transportPacks: {
      nodes: [
         {
            totalWeight: {
               weight: String,
               unit: String
            },
            _id: false
         }
      ]
   }
});

module.exports = mongooseDB.model("shipments", shipmentsSchema);
