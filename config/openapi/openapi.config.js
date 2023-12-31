const fs = require('fs');
const yaml = require('yaml');

const mainOpenapiDoc = fs.readFileSync('config/openapi/openapi.yaml', 'utf8');
const mainSwaggerDocument = yaml.parse(mainOpenapiDoc);
const paths = {};
const components = {
  schemas: {},
  parameters: {},
  'x-global-variables': mainSwaggerDocument.components['x-global-variables'],
};

// Add src/user doc
const userOpenapiDoc = fs.readFileSync(
  'src/components/user/user.openapi.yaml',
  'utf8'
);
const userSwaggerDocument = yaml.parse(userOpenapiDoc);
const { paths: userPaths } = userSwaggerDocument;
const { schemas: userSchemas, parameters: userParameters, ...userVariables } = userSwaggerDocument.components;
Object.assign(paths, userPaths);
Object.assign(components.schemas, userSchemas);
Object.assign(components.parameters, userParameters);
Object.assign(components, userVariables);

// Add src/friend doc
const friendOpenapiDoc = fs.readFileSync(
  'src/components/friend/friend.openapi.yaml',
  'utf8'
);
const friendSwaggerDocument = yaml.parse(friendOpenapiDoc);
const { paths: friendPaths } = friendSwaggerDocument;
const { schemas: friendSchemas, parameters: friendParameters, ...friendVariables } = friendSwaggerDocument.components;
Object.assign(paths, friendPaths);
Object.assign(components.schemas, friendSchemas);
Object.assign(components.parameters, friendParameters);
Object.assign(components, friendVariables);

// Add src/post doc
const postOpenapiDoc = fs.readFileSync(
  'src/components/post/post.openapi.yaml',
  'utf8'
);
const postSwaggerDocument = yaml.parse(postOpenapiDoc);
const { paths: postPaths } = postSwaggerDocument;
const { schemas: postSchemas, parameters: postParameters, ...postVariables } = postSwaggerDocument.components;
Object.assign(paths, postPaths);
Object.assign(components.schemas, postSchemas);
Object.assign(components.parameters, postParameters);
Object.assign(components, postVariables);

mainSwaggerDocument.paths = paths;
mainSwaggerDocument.components = components;

module.exports = mainSwaggerDocument;
