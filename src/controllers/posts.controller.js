import { postModel, messageModel } from "../models/post.model.js";

export const setPost = async (formData) => {
  const postUser = await postModel.create({
    nom: formData.nom,
    email: formData.email,
    password: formData.password,
  });
};

export const getPosts = async (formData) => {
  const getUsers = await postModel.find({
    nom: formData.nom,
    password: formData.password,
  },{updatedAt:false, createdAt:false, __v:false});
  return getUsers;
};

export const GetUsers = async (password) => {
  return await postModel.find({
    password: {$ne: password}
  });
};

export const SetMessages = async (messageData) => {
  const NewMessage = await messageModel.create({
    auteur: messageData.auteur,
    destinataire: messageData.destinataire,
    contenue: messageData.contenue,
    createdAt: messageData.createdAt
  });
};

export const GetMessages = async (MsgData) => {
  return await messageModel.find({
    $or: [
      { auteur: MsgData.auteur, destinataire: MsgData.destinataire },
      { auteur: MsgData.destinataire, destinataire: MsgData.auteur }
    ]
  }).sort({ createdAt: 1 });
};
export const GetAllMessages = async () => {
  return await messageModel.find({}).sort({ createdAt: 1 });
};