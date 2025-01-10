import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { 
      type: String,
      required: true,
      unique: true, 
    },
    email: { 
      type: String, 
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
      default: "https://www.freepik.com/free-photos-vectors/default-user"
    },
    bio: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    answeredQuestions: {
      type: Array,
      required: false,
    }
  }, {timestamps: true});

  const User = mongoose.model('User', UserSchema)

  export default User