import mongoose from 'mongoose';

const dsaProblemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  category: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  companies: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
dsaProblemSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const DSAProblem = mongoose.model('DSAProblem', dsaProblemSchema);

export default DSAProblem;
