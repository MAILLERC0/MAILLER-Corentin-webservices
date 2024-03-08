import mongoose from 'mongoose';
const { Schema } = mongoose;


const projectSchema = new Schema({
    name: { type:String,  required:'un nom de projet est requis', unique:true },
    team: [Schema.Types.Mixed],
    },
    { timestamps: true }
);

projectSchema.index({ name: 1 });

const projectModel = mongoose.model('projects',projectSchema)

export default projectModel