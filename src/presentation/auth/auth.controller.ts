import e, { Request, Response } from "express";
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthService } from '../services/auth.service';
import { CustomError } from "../../domain";

export class AuthController {
    
    //DI
    // Se puede inicializar en el mismo constructor o donde lo necesitamos
    constructor(
        private readonly authService: AuthService,
    ){}

    private handleError = (error: unknown, res: Response ) => {
        if( error instanceof CustomError ){
            return res.status(error.statusCode).json({ error: error.message });
        }
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' });
    }

    registerUser = (req: Request, res: Response) => {
        const [ error, registerUserDto ] = RegisterUserDto.create(req.body);
        if( error ) return res.status(400).json({ error });
        
        this.authService.registerUser(registerUserDto!)
            .then( (user) => res.json(user) )
            .catch( (error) => this.handleError(error, res) );
    }

    loginUser = (req: Request, res: Response) => {
        res.json('registerUser')
    }
    
    validateUser = (req: Request, res: Response) => {
        res.json('registerUser')
    }
}