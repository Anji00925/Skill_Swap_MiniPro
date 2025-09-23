// import mongoose from 'mongoose';

// const connectionSchema = new mongoose.Schema({
//   requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
// }, { timestamps: true });

// export default mongoose.model('Connection', connectionSchema);


import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      
    skill: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Connection", connectionSchema);
