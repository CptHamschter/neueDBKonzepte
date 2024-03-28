import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/user.mjs';

const initializeDB = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/NachrichtenpageScharle');

  // Optional: Bestehende Benutzer löschen
  //await User.deleteMany({});

  // Vordefinierte Benutzer
  const users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'journalist@example.com', password: 'journalist123', role: 'journalist' },
  ];

  for (let userData of users) {
    const user = new User(userData);
    await user.save(); // Die pre('save')-Middleware wird das Hashing durchführen
  }

  console.log('Datenbank initialisiert.');
  mongoose.disconnect();
};

initializeDB().catch(err => {
  console.error('Fehler bei der Initialisierung der DB:', err);
  mongoose.disconnect();
});
