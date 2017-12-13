'use strict';

require('zone.js/dist/zone-node');    // Angular change detection.
require('reflect-metadata');          // Interpret decorator metadata.

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');   // Server-side rendering engine module.
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

// Pull in our server-side version of our application.
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist-server/main.bundle');

function angularRouter(req, res) {
  res.render('index', {req, res});
}

const app = express();

app.engine('html', ngUniversal.ngExpressEngine({    // Set up default rendering engine.
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ] 
}));
app.set('view engine', 'html');         // Input and output file type is html.
app.set('views', 'dist-browser');       // Render views to a 'dist-browser' folder.
                                        // In particular, pre-render index.html there, replacing original.
app.get('/', angularRouter);
app.use(express.static(`${__dirname}/dist-browser`)); // Handle static files, e.g. images.
app.get('*', angularRouter);

app.listen(3000, () => {
  console.log('Listening on port 3000');
})

