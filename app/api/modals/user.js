import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true, // Ensures that each username is unique
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User =mongoose.models.user_auth_system2 ||  mongoose.model('user_auth_system2', userSchema);
export default User;