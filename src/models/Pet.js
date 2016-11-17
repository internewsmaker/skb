import mongoose from 'mongoose';
import _ from 'lodash';
const { Schema } = mongoose;

const PetSchema = new Schema({
  type: {
    type: String,
    enum: ['cat', 'dog'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamp: true,
});

PetSchema.methods.toJSON = function () {
  return _.pick(this, ['name', 'type', 'owner']);
};

export default mongoose.model('Pet', PetSchema);
