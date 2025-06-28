import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    let gotconversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotconversation) {
      gotconversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotconversation.messages.push(newMessage._id);
    }
    await gotconversation.save();

    // socket io

    return res.status(201).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const Conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("message");

    return res.status(200).json(Conversation.message);
  } catch (error) {
    console.log(error);
  }
};
