var express                             = require('express');
var bodyParser                          = require('body-parser');
var cors                                = require('cors');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema }            = require('graphql-tools');
var resolvers                           = require("./resolvers");
var FS                                  = require("fs")

var typeDefs = [ FS.readFileSync("./schema.gql", "utf8") ];
var schema   = makeExecutableSchema({typeDefs, resolvers});
var app      = express();

app.use('*', cors({ origin: 'http://localhost:3000' }));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));