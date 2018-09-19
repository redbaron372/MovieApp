import express from 'express'; 
import dotenv from 'dotenv';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import expressGraphQL from 'express-graphql';
import schema from './schema/schema';
dotenv.config();
const port = process.env.PORT || 8000;
const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(port, () => {
  console.log('Listening on port '+ port);
});
