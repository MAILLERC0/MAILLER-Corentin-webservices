import mongoose from 'mongoose';
const { Schema } = mongoose;


const projectSchema = new Schema({
    name: String,
    team: [Schema.Types.Mixed],
    },
    { timestamps: true }
);

const projectModel = mongoose.model('projects',projectSchema)

export default projectModel