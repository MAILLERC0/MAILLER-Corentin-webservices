import mongoose from 'mongoose';
const { Schema } = mongoose;


const skillSchema = new Schema({
    name:String,
});

const skillModel = mongoose.model('skills',skillSchema)

export default skillModel