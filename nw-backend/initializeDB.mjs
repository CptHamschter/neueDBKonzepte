import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.mjs';

const initializeDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/NachrichtenpageScharle', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Optional: Bestehende Benutzer löschen
  //await User.deleteMany({});

  // Vordefinierte Benutzer
  const users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'journalist@example.com', password: 'journalist123', role: 'journalist' },
  ];

  for (let userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 8);
    const user = new User({ ...userData, password: hashedPassword });
    await user.save();
  }

  console.log('Datenbank initialisiert.');
  mongoose.disconnect();
};

initializeDB().catch(err => {
  console.error('Fehler bei der Initialisierung der DB:', err);
  mongoose.disconnect();
});
