
// import mongoose from 'mongoose';

// const skillSchema = new mongoose.Schema({
//   name: { type: String, default: '' }, // optional
//   skill: { type: String, required: true },
//   description: { type: String, required: true },
//   tags: { type: String, default: '' },
//   location: { type: String, default: '' },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// }, { timestamps: true });

// export default mongoose.model('Skill', skillSchema);




import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  skill: { type: String, required: true }, // use "skill", not "title"
  description: { type: String, required: true },
  tags: { type: String, default: '' },
  location: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
