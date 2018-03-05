const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const user = {
  identifier: {
    type: String,
    unique: true,
    select: false
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  org: {
    type: String,
    required: true,
    default: 'None'
  },
  roles: {
    type: [String],
    default: ['USER']
  }
};

const userSchema = mongoose.Schema(user, { timestamps: true })
  .pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    this.identifier = Buffer.from(`${this.username}@${this.org}`).toString('base64');
    next();
  })
  .index({ org: 1, username: 1 });

userSchema.query.findByUsername = function(username, org = 'None') {
  return this.findOne({ username, org }).select('+password');
};

userSchema.methods.comparePassword = function(plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
