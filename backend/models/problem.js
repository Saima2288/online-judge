import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  problemNumber: { type: Number, required: true, unique: true }, // added this line
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  examples: [
    {
      input: String,
      output: String,
    },
  ],
  constraints: [String],
  createdAt: { type: Date, default: Date.now }
});

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;
