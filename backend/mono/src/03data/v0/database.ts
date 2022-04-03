import mongoose from 'mongoose'
import {config} from '../../config'

const uri = `mongodb+srv://${config.mongoUser}:${config.mongoPass}@${config.mongoAddress}`

export const myDatabase= mongoose.connect(uri);
export const databaseName: string = 'Mongo Cloud Database';