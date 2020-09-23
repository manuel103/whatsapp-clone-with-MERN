import mongoose from "mongoose";

// schema
const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

export default mongoose.model("messageContent", whatsappSchema);
