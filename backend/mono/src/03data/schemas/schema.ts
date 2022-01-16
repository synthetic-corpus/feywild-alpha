import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _authID: { type: String, required: true},
    name: { type: String, default: 'player'},
    tier: {type: Number, default: 0}
})

export const UserModel = mongoose.model('User',userSchema);