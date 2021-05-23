var express = require('express');
var app = express();
var cors = require('cors');
var database = require('./config/database');
var port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


database.connect((err) => {
    if(err) throw err;
});

app.use(cors());
app.use(express.urlencoded({
    extended:true
}));




app.use('/', [
    require('./routes/auth')
]);


app.use('/api/instructor', [
    require('./routes/instructor')
]);

app.use('/api/class', [
    require('./routes/class')
]);

app.use('/api/modules', [
    require('./routes/modules')
]);

app.listen(port, () => {
    console.log(`listening localhost : ${port}`);
});