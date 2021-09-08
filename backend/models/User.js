const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    validate: {
      validator: async function(email) {
        const user = await this.constructor.findOne({ email });
        if(user) {
          if(this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      },
      message: props => 'The specified email address is already in use.'
    },
    required: [true, 'User email required']
  },
  password: String,
})

const User = mongoose.model('User', userSchema);
module.exports = User;