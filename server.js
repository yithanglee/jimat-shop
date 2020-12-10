const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const invoice = require('./server/invoice');
const app = express();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/api/invoice', (req, res) => invoice.get(req, res));
app.post('/api/invoice', (req, res) => invoice.generate(req, res));
app.get('/download_invoice', (req, res) => invoice.download(req, res));

app.use('/icon', express.static(__dirname + '/build/icon'));
app.use('/static', express.static(__dirname + '/build/static'));
app.use('/', express.static(__dirname + '/build/'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3000);
