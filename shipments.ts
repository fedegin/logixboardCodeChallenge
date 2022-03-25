const shipmentsModel = require("./models/shipmentsModel");

export const createShipment = async (req: any, res: any) => {
   try {
      const {
         referenceId,
         organizations,
         transportPacks,
         estimatedTimeArrival
      } = req?.body;
      if (!referenceId)
         return res.status(400).send("Bad request - Missing parameters");

      console.log(`Adding Shipment referenceId ${referenceId}`);
      const shipment = new shipmentsModel({
         type: "SHIPMENT",
         referenceId: referenceId,
         organizations: organizations?.length > 0 ? organizations : [],
         transportPacks:
            transportPacks?.nodes?.length > 0 ? transportPacks : { nodes: [] },
         estimatedTimeArrival: estimatedTimeArrival ? estimatedTimeArrival : ""
      });

      console.log(`Estimated Time Arrival ${estimatedTimeArrival}`);

      await shipment.save();
      res.status(200).send("Success");
   } catch (e) {
      console.log("Error Create Shipment ");
      console.log(e);
      res.status(400).send("Bad request");
   }
};

export const getShipmentById = async (req: any, res: any) => {
   try {
      const { shipmentId } = req?.params;
      if (!shipmentId) return res.status(400).send("Bad request");

      console.log(`Searching for shipment ID ${shipmentId}`);

      const shipment = await shipmentsModel.find({ referenceId: shipmentId });
      if (shipment.length > 0) {
         res.status(200).send(shipment);
      } else {
         console.log("Shipment not found");
         res.status(200).send({ message: "Shipment not found" });
      }
   } catch (e) {
      console.log("Error Getting Shipment");
      console.log(e);
      res.status(400).send("Bad request");
   }
};

export const getShipmentsWeight = async (req: any, res: any) => {
   try {
      console.log("Calculating weight");

      const shipments = await shipmentsModel.find();

      if (shipments.length > 0) {
         /*
         const transportPacksNodes = shipments.map((data: any) => {
            if (data?.transportPacks?.nodes?.length > 0)
               return data.transportPacks.nodes;
         });*/
         const transportPacksNodes = shipments
            .filter((data: any) => data?.transportPacks?.nodes?.length > 0)
            .map((data: any) => data.transportPacks.nodes);

         let totalKgrs = 0;
         let totalPounds = 0;
         let totalOunces = 0;

         for (let i = 0; i < transportPacksNodes.length; i++) {
            if (transportPacksNodes[i]) {
               const { totalWeight } = transportPacksNodes[i][0];
               if (!totalWeight) continue;
               const { weight, unit } = totalWeight;
               if (weight === 0) continue;

               switch (unit.toLowerCase()) {
                  case "kilograms":
                     totalKgrs += parseFloat(weight);
                     break;
                  case "ounces":
                     totalKgrs += parseFloat(weight) * 0.0283495;
                     break;
                  case "pounds":
                     totalKgrs += parseFloat(weight) * 0.4535920000001679;
                     break;
                  default:
               }
            }
         }

         totalPounds = totalKgrs * 2.20462;
         totalOunces = totalKgrs * 35.274;

         res.status(200).send({
            totalKgrs: totalKgrs,
            totalPounds: totalPounds,
            totalOunces: totalOunces
         });
      } else {
         console.log("No Shipments found to calculate weight");
         res.status(200).send({
            message: "No Shipments found to calculate weight"
         });
      }
   } catch (e) {
      console.log("Error Getting Shipments ");
      console.log(e);
      res.status(400).send("Bad request");
   }
};
