const express = require("express");
const bodyParser = require("body-parser");

const {
   createShipment,
   getShipmentById,
   getShipmentsWeight
} = require("./shipments");
const { createOrganization, getOrganizationById } = require("./organizations");

const app = express();
app.use(bodyParser.json());
const port = 3000;

app.post("/shipment", async (req: any, res: any) => createShipment(req, res));

app.post("/organization", (req: any, res: any) => createOrganization(req, res));

app.get("/shipments/:shipmentId", (req: any, res: any) =>
   getShipmentById(req, res)
);

app.get("/organizations/:organizationId", (req: any, res: any) =>
   getOrganizationById(req, res)
);

app.get("/totalweight", (req: any, res: any) => getShipmentsWeight(req, res));

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`);
});
