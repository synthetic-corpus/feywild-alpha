import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const dilation = new mongoose.Schema({
    sides: {type: Number, required: true},
    rolls: {type: Number, required: true},
    add: {type: Number, required: true}
})

const feySegment = new mongoose.Schema({
    month: {type: String, required: true},
    dayNumber: {type: String, reqruied: true},
    season: {type: String, required: true}
})

const FeywildSchema = new mongoose.Schema({
    _user_id: {type: ObjectId, required: true},
    _campaign_id: {type: ObjectId},
    feywildName: {type: String},
    dilation: {type: dilation, required: true},
    currentSegment: {type: Number, required: true, default: 0},
    feySegments: {type: [feySegment], require: true}
})

export const FeywildModel = mongoose.model('FeywildZone',FeywildSchema)