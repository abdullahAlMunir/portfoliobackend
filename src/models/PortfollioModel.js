import mongoose from 'mongoose';

const DataSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String, default: '' },
    codeLink: { type: String, default: '' },
    liveLink: { type: String, default: '' },
    userID: { type: String, required: true }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export const PortfollioModel = mongoose.model("portfollios", DataSchema);