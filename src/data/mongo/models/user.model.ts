//* Definición modelo o entidad usuario, utilizado por el ORM mongoose
import mongoose from 'mongoose';

// El schema es como luce nuestra entidad
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [ true, 'Name is required' ]
    },
    email: {
        type: String,
        require: [ true, 'Email is required' ],
        unique: true
    },
    password: {
        type: String,
        require: [ true, 'Password is required' ]
    },
    img: {
        type: String,
    },
    role: {
        type: [String],
        default: [ 'USER_ROLE' ],
        enum: [ 'ADMIN_ROLE', 'USER_ROLE' ],
    }
} );

export const UserModel = mongoose.model('User', userSchema);