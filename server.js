const compression = require('compression')
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(compression());

app.use(express.static(__dirname + '/dist'));

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${process.env.PORT || 3000}`);
});