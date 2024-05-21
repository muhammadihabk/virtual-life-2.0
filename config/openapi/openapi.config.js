const fs = require('fs');
const yaml = require('yaml');

const mainOpenapiDoc = fs.readFileSync('config/openapi/openapi.yaml', 'utf8');
const mainSwaggerDocument = yaml.parse(mainOpenapiDoc);
const paths = {};
const components = {
  schemas: {},
  ...mainSwaggerDocument.components,
};

// Add src/auth doc
const authOpenapiDoc = fs.readFileSync('src/auth/auth.openapi.yaml', 'utf8');
const authSwaggerDocument = yaml.parse(authOpenapiDoc);
const { paths: authPaths } = authSwaggerDocument;
const { schemas: authSchemas } = authSwaggerDocument.components;
Object.assign(paths, authPaths);
Object.assign(components.schemas, authSchemas);

// Add src/user doc
const userOpenapiDoc = fs.readFileSync('src/components/user/user.openapi.yaml', 'utf8');
const userSwaggerDocument = yaml.parse(userOpenapiDoc);
const { paths: userPaths } = userSwaggerDocument;
const { schemas: userSchemas, parameters: userParameters, ...userVariables } = userSwaggerDocument.components;
Object.assign(paths, userPaths);
Object.assign(components.schemas, userSchemas);
Object.assign(components.parameters, userParameters);
Object.assign(components, userVariables);

// Add src/friend doc
const friendOpenapiDoc = fs.readFileSync('src/components/friend/friend.openapi.yaml', 'utf8');
const friendSwaggerDocument = yaml.parse(friendOpenapiDoc);
const { paths: friendPaths } = friendSwaggerDocument;
const { schemas: friendSchemas, parameters: friendParameters, ...friendVariables } = friendSwaggerDocument.components;
Object.assign(paths, friendPaths);
Object.assign(components.schemas, friendSchemas);
Object.assign(components.parameters, friendParameters);
Object.assign(components, friendVariables);

// Add src/post doc
const postOpenapiDoc = fs.readFileSync('src/components/post/post.openapi.yaml', 'utf8');
const postSwaggerDocument = yaml.parse(postOpenapiDoc);
const { paths: postPaths } = postSwaggerDocument;
const { schemas: postSchemas, parameters: postParameters, ...postVariables } = postSwaggerDocument.components;
Object.assign(paths, postPaths);
Object.assign(components.schemas, postSchemas);
Object.assign(components.parameters, postParameters);
Object.assign(components, postVariables);

// Add src/reaction doc
const reactionOpenapiDoc = fs.readFileSync('src/components/reaction/reaction.openapi.yaml', 'utf8');
const reactionSwaggerDocument = yaml.parse(reactionOpenapiDoc);
const { paths: reactionPaths } = reactionSwaggerDocument;
const { schemas: reactionSchemas, parameters: reactionParameters, ...reactionVariables } = reactionSwaggerDocument.components;
Object.assign(paths, reactionPaths);
Object.assign(components.schemas, reactionSchemas);
Object.assign(components.parameters, reactionParameters);
Object.assign(components, reactionVariables);

// Add src/comment doc
const commentOpenapiDoc = fs.readFileSync('src/components/comment/comment.openapi.yaml', 'utf8');
const commentSwaggerDocument = yaml.parse(commentOpenapiDoc);
const { paths: commentPaths } = commentSwaggerDocument;
const { schemas: commentSchemas, parameters: commentParameters, ...commentVariables } = commentSwaggerDocument.components;
Object.assign(paths, commentPaths);
Object.assign(components.schemas, commentSchemas);
Object.assign(components.parameters, commentParameters);
Object.assign(components, commentVariables);

mainSwaggerDocument.paths = paths;
mainSwaggerDocument.components = components;

if (process.env.NODE_ENV === 'production') {
  mainSwaggerDocument.servers = [{ url: process.env.API_BASEURL }];
} else {
  mainSwaggerDocument.servers = [{ url: 'http://localhost:3000' }];
}

module.exports = mainSwaggerDocument;
