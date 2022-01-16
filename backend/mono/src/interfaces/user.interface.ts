export interface user {
    _id?: String,
    _authID: String,
    name: String,
    tier: Number
}

export interface userPatch {
    name: String,
    tier: Number
}