import mongoose from 'mongoose'

const FileSchema=new mongoose.Schema({
    name: String,
    size: Number,
    uuid: String,
    path: String,

},
{timestamps: true}
 )

export const FileModel =mongoose.model('FileModel',FileSchema)
