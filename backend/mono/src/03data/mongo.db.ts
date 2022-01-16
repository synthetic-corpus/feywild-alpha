import mongoose from 'mongoose'
import {config} from '../config'

const uri = `mongodb+srv://${config.mongoUser}:${config.mongoPass}@${config.mongoAddress}`

export const MongoDB = mongoose.connect(uri);