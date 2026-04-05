import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        nom: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
    }
)

export const postModel = mongoose.model ("user", postSchema);


const messageSchema = mongoose.Schema(
    {
        auteur: {
            type: String,
            require: true
        },
        destinataire: {
            type: String,
            require: true
        },
        contenue: {
            type: String,
            require: true
        },
        createdAt: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true
    }
)
export const messageModel = mongoose.model("message", messageSchema);