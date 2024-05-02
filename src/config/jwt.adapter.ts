import jwt from 'jsonwebtoken';
import { envs } from './envs';

// Se puede definir directamente en el constructor
// Esta es otra manera de resolver dependencias ocultas
// Se puede utilizar un generador aleatorio de SEED, para mayor seguridad.
const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
    // Primero debemos preguntarnos si necesitamos inyectar algo en el constructor


    static async generateToken( payload: any, duration: string = '2h' ) {
        return new Promise((resolve) => {
            jwt.sign( payload, JWT_SEED, { expiresIn: duration}, (err, token) => {
                if( err) return resolve(null);
                return resolve(token);
            });
        })
    }

    static validateToken( token: string) {

    }
}