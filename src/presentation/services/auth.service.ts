import { bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
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
            // Encriptar contraseña
            user.password = bcryptAdapter.hash( registerUserDto.password );

            await user.save();
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

    public async loginUser( loginUserDto: LoginUserDto){
        const user = await UserModel.findOne({ name: loginUserDto.name });
        ( !user ) && CustomError.badRequest('User not found');
        try {
            
            // Comparar contraseñas
            if( user?.password === null || user?.password === undefined || user === null || user === undefined) {
                return CustomError.badRequest('Invalid password');
            }
            console.log( loginUserDto.password )
            const isEqual = bcryptAdapter.compare( loginUserDto.password, user.password  );
            if(!isEqual) throw CustomError.badRequest('Invalid password');
            
            const { password, ...userRest } = UserEntity.fromObject( user );

            return {
                user: userRest,
                token: 'ABC'
            }

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }
    }

}