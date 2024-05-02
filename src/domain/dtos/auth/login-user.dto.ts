export class LoginUserDto {
    constructor(
        public readonly name:     string,
        public readonly password: string,
    ){}
}