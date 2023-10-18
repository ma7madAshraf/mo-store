const dotenv = require("dotenv");
dotenv.config();

const Airtable = require("airtable-node");
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context, cb) => {
  try {
    const response = await airtable.list({ maxRecords: 200 });

    const products = await response.records.map((product) => {
      const { id, fields } = product;
      const {
        name,
        description,
        featured,
        colors,
        price,
        images,
        company,
        category,
        shipping,
      } = fields;
      if (shipping === undefined) {
        shipping === false;
      }
      const { url } = images[0];
      return {
        id,
        name,
        description,
        featured,
        price,
        colors,
        company,
        category,
        shipping,
        image: url,
      };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: "error",
    };
  }
};
