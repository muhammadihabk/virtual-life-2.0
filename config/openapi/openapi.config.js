const fs = require('fs');
const yaml = require('yaml');

const paths = {};
const components = {
  schemas: {},
  parameters: {},
};

// Add src/user doc
const userOpenapiDoc = fs.readFileSync(
  'src/components/user/user.openapi.yaml',
  'utf8'
);
const userSwaggerDocument = yaml.parse(userOpenapiDoc);
const { paths: userPaths } = userSwaggerDocument;
const { schemas: userSchemas, parameters: userParameters, ...variables } = userSwaggerDocument.components;
Object.assign(paths, userPaths);
Object.assign(components.schemas, userSchemas);
Object.assign(components.parameters, userParameters);
Object.assign(components, variables);

const mainOpenapiDoc = fs.readFileSync('config/openapi/openapi.yaml', 'utf8');
const mainSwaggerDocument = yaml.parse(mainOpenapiDoc);
mainSwaggerDocument.paths = paths;
mainSwaggerDocument.components = components;

module.exports = mainSwaggerDocument;
