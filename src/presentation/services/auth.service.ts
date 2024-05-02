import { UserModel } from '../../data';
import { CustomError } from '../../domain';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { UserEntity } from '../../domain/entities/user.entity';
export class AuthService {
    // DI
    constructor(

    ){}

    public async registerUser( registerUserDto: RegisterUserDto ){
        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if( existUser ) throw CustomError.badRequest('User already exists');
        
        try {
            const user = new UserModel( registerUserDto );
            await user.save();
            // Encriptar contraseña

            // JWT <-- mantener la autenticacion

            // Email de confirmación

            const { password, ...userRest } = UserEntity.fromObject( user );
            return { 
                user:  userRest, 
                token: 'ABC'
            };
        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }
    }

}