const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = "mongodb://0.0.0.0:27017"
const router = require('./router/router');
const dotenv = require('dotenv');
const post = require('./router/post')
const cors = require('cors');
const protected = require('./router/protected')
app.use(cors());
//

dotenv.config();
 
app.use(express.json());

mongoose.connect(db, {useNewUrlParser : true});

const con = mongoose.connection;

try{
  con.on('open', () => {
    console.log('mongoose is connected')
  })
}catch(err){
    console.log('mongoose is not connected')
}

app.use('/api/users/', router)
app.use('/post', post)


app.listen(4000, () => {
    console.log('server is running!!! http://localhost:4000')
})
