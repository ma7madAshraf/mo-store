const dotenv = require("dotenv");
dotenv.config();

const Airtable = require("airtable-node");
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters;

  if (id) {
    let product = await airtable.retrieve(id);
    if (product) {
      product = { id: product.id, ...product.fields };
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } else {
      return {
        statusCode: 200,
        body: `no products with id: ${id}`,
      };
    }
  } else {
    return {
      statusCode: 500,
      body: "error no id",
    };
  }
};
