import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  //username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: [/.+\@.+\..+/, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'] },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'journalist'], 
    default: 'user' 
  },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

export default mongoose.model('User', userSchema);



