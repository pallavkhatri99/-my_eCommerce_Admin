const mongoose = require('mongoose');
const env = require('dotenv').config({ path: '../../.env' });
mongoose.set('strictQuery', false);
const uri = process.env.MONGOOSE_CONN_STRING;
const db = mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected!'))
  .catch(() => console.log('Opps NotConnected!'));

module.exports = db

