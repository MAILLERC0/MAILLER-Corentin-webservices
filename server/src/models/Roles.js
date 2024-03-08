import mongoose from 'mongoose';
const { Schema } = mongoose;


const roleSchema = new Schema({
    name:String,
    authorizations:[Schema.Types.Mixed]
});

const roleModel = mongoose.model('roles',roleSchema)

export default roleModel