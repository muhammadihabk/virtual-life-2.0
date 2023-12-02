# Virtual Life

# Maintenance
## OpenAPI
- All components (user, post, ...) OpenAPI files are combined into 1 object and passed to swagger ui. So you should always reference objects rather than other YAML files. If you needed to create variables for your component, follow this format: `x-<componentName>-variables`. Each time you create a new OpenAPI file, you should update `config/openapi/openapi.config.js` accordingly.