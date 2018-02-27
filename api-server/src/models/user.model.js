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
  .post('save', (err, doc, next) => {
    if (err.code === 11000) {
      const error = new Error();
      error.statusCode = 409;
      error.message = 'Username is duplciated in the organization.';
      next(error);
    } else {
      next(err);
    }
  })
  .index({ org: 1, username: 1 });

userSchema.query.findByUsername = function(username, org = 'None') {
  return this.find({ username, org });
};

userSchema.methods.comparePassword = function(plainPassword) {
  return bcrypt.compareSync(plainPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
