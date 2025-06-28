import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    message:{
        type:{
            type:String,
            require:true
        }
    }
}, {timestamps:true});

export const Message = mongoose.model("Message", messageModel);