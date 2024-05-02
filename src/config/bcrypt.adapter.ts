import { compareSync, genSaltSync, hashSync } from 'bcrypt';

// Puede ser un objeto o una clase con metodos estaticos
export const bcryptAdapter = {
    hash: ( password: string ) => {
        const salt = genSaltSync(12);
        return hashSync(password, salt);
    },

    compare: ( password: string, hashed: string ) => {
        return compareSync( password, hashed );
    }
}