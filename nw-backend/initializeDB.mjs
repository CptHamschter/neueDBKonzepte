import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/user.mjs';
import Post from './models/post.mjs';

const initializeDB = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/NachrichtenpageScharle');

  // Vordefinierte Benutzer hinzufügen
  const users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'journalist@example.com', password: 'journalist123', role: 'journalist' },
    { email: 'newadmin@example.com', password: 'newadmin123', role: 'admin' },
    { email: 'newjournalist@example.com', password: 'newjournalist123', role: 'journalist' }
  ];

  for (let userData of users) {
    const user = new User(userData);
    await user.save(); // Die pre('save')-Middleware wird das Hashing durchführen
  }

  // Finde den Journalisten für die Autorenschaft der Posts
  const journalistUser = await User.findOne({ email: 'journalist@example.com' });

  const posts = [
    { 
      title: 'Durchbruch in der erneuerbaren Energie: Solarzellen der nächsten Generation', 
      content: 'Forscher der Technischen Universität SolarTech haben eine neue Generation von Solarzellen vorgestellt, die doppelt so effizient sind wie aktuelle Modelle. Diese Entdeckung könnte den Weg für sauberere, nachhaltigere Energiequellen ebnen und die Abhängigkeit von fossilen Brennstoffen deutlich reduzieren.', 
      author: journalistUser._id 
    },
    { 
      title: 'Globale Klimakonferenz 2024 endet mit historischem Abkommen', 
      content: 'Die Klimakonferenz in Neu-Delhi ist zu einem erfolgreichen Abschluss gekommen, mit einem historischen Abkommen, das von über 190 Ländern unterzeichnet wurde. Das Abkommen legt bindende Ziele zur Reduzierung von Treibhausgasemissionen fest und markiert einen Wendepunkt im globalen Kampf gegen den Klimawandel.', 
      author: journalistUser._id 
    },
    { 
      title: 'Künstliche Intelligenz in der Medizin: Revolution in der Diagnostik', 
      content: 'Ein neues KI-gesteuertes Diagnosesystem hat in klinischen Studien eine Genauigkeit von über 99% bei der Erkennung seltener Krankheiten gezeigt. Experten sagen voraus, dass diese Technologie die medizinische Diagnostik revolutionieren und die Behandlungsergebnisse für Patienten weltweit verbessern könnte.', 
      author: journalistUser._id 
    },
    { 
      title: 'Rekordbrechende Weltraummission: Mensch auf dem Mars', 
      content: 'Die internationale Raumfahrtorganisation Interstellar hat erfolgreich die erste bemannte Mission zum Mars abgeschlossen. Die Astronautin Dr. Maria Gomez betrat als erste Person den roten Planeten, ein Meilenstein in der Geschichte der Menschheit und ein großer Schritt für die interplanetare Exploration.', 
      author: journalistUser._id 
    }
  ];
  
  for (let postData of posts) {
    const newPost = new Post(postData);
    await newPost.save();
  }

  console.log('Datenbank initialisiert.');
  mongoose.disconnect();
};

initializeDB().catch(err => {
  console.error('Fehler bei der Initialisierung der DB:', err);
  mongoose.disconnect();
});
