const express = require('express');
const { Router } = express;
const routGraphQl = Router();
const contenedorProductos = require ('../contenedores/contenedorMongoDB');
const rootResolver = new contenedorProductos;
const schemaProductos = require('../utils/schemaProd');

routGraphQl.use('/graphql', graphqlHTTP({
    schema: schemaProductos,
    rootResolver: rootResolver,
    graphiql: true
    }
));

module.exports = {routGraphQl}