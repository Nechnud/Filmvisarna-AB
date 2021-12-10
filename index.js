//Get the webserver maybe
const express = require('express');
const app = express();
app.use(express.static('frontend'));
const jsonflex = require('jsonflex')({ jsonDir: '/frontend/json' });
app.use(jsonflex);
app.listen(4000, () => console.log('listening on port 4000'));