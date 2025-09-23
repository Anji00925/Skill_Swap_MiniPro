// // models/User.js
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true, lowercase: true, trim: true },
//   password: { type: String, required: true },
//   // Optional fields that you might add later:
//   offeredSkills: [{ type: String }],
//   seekingSkills: [{ type: String }]
// }, { timestamps: true });

// export default mongoose.model('User', userSchema);


// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
