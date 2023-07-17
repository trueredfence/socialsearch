import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,    
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  }, 
  image: {
    type: String,
  },
  api:{
    type:String,
  },
  validity:{
    type:String,
    //TODO:Change this as date format later    
  }
});

const User = models.User || model("User", UserSchema);

export default User;