const mongodb = require("../db/connect");

async function saveUser(profile) {
  const db = mongodb.getDb(); // 👈 Ya devuelve la DB lista
  await db.collection("users").updateOne(
    { googleId: profile.id },
    { $set: { name: profile.displayName, email: profile.emails[0].value } },
    { upsert: true }
  );
}

module.exports = { saveUser };
