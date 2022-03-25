const organizationsModel = require("./models/organizationsModel");

export const createOrganization = async (req: any, res: any) => {
   try {
      const { id: requestId, code: requestCode, type: requestType } = req?.body;
      if (!requestId || !requestCode)
         return res.status(400).send("Bad request - Missing parameters");

      console.log(`Validating duplicates for organization ID ${requestId}`);
      const duplicate = await organizationsModel.find({
         id: requestId
      });
      if (duplicate.length > 0) {
         console.log(`Organization ID "${requestId}" already exists`);
         return res
            .status(200)
            .send({ message: `Organization ID "${requestId}" already exists` });
      }

      console.log(`Adding Organization ID ${requestId}`);
      const organization = new organizationsModel({
         type: requestType,
         id: requestId,
         code: requestCode
      });

      await organization.save();
      res.status(200).send("Success");
   } catch (e) {
      console.log("Error Create Organization");
      console.log(e);
      res.status(400).send("Bad request");
   }
};

export const getOrganizationById = async (req: any, res: any) => {
   try {
      const { organizationId } = req?.params;
      if (!organizationId) return res.status(400).send("Bad request");

      console.log(`Searching for organization ID ${organizationId}`);

      const organization = await organizationsModel.find({
         id: organizationId
      });
      if (organization.length > 0) {
         res.status(200).send(organization);
      } else {
         res.status(200).send({ message: "Organization not found" });
      }
   } catch (e) {
      console.log("Error Getting Organization");
      console.log(e);
      res.status(400).send("Bad request");
   }
};
