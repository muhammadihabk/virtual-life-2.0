const fs = require('fs');
const yaml = require('yaml');

const mainOpenapiDoc = fs.readFileSync('config/openapi/openapi.yaml', 'utf8');
const mainSwaggerDocument = yaml.parse(mainOpenapiDoc);

const userOpenapiDoc = fs.readFileSync(
  'src/components/user/user.openapi.yaml',
  'utf8'
);
const userSwaggerDocument = yaml.parse(userOpenapiDoc);

const paths = {};
const schemas = {};
const parameters = {};

Object.assign(paths, userSwaggerDocument.paths);
Object.assign(schemas, userSwaggerDocument.components.schemas);
Object.assign(parameters, userSwaggerDocument.components.parameters);

mainSwaggerDocument.paths = paths;
mainSwaggerDocument.components = {
  schemas,
  parameters,
};

module.exports = mainSwaggerDocument;
