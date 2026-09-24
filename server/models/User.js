const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//use mpngoose Schema options well (required,unique,trim,....)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  profile: {
    college: {
      type: String,
      default: '',
      trim: true,
    },
    academicGoal: {
      type: String,
      default: '',
      trim: true,
    },
    studyPreference: {
      type: String,
      default: '',
      trim: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook: Hash password before saving if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) { //prevent hashing already hashed password
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method: Match entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

