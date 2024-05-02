export class LoginUserDto {
    constructor(
        public readonly name:     string,
        public readonly password: string,
    ){}

    static login(object: { [key: string]: any}): [ string?, LoginUserDto?]{
        const { name, password } = object;
        if( !name ) return [ 'Missing name' ];
        if( !password ) return [ 'Missing password' ];
        return [ undefined, new LoginUserDto( name, password )];
    }
}