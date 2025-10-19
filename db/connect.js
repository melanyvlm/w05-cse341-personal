const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('📦 Database is already initialized!');
    return callback(null, _db);
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      // Aquí seleccionas tu base de datos (la parte después del / en la URI)
      _db = client.db('movies');
      console.log('✅ Connected to MongoDB Atlas!');
      callback(null, _db);
    })
    .catch((err) => {
      console.error('❌ Error connecting to MongoDB:', err);
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialized!');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
