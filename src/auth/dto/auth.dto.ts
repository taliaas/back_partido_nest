import { IsString, IsNotEmpty, Length } from "class-validator";

export class AuthDto {

	@IsNotEmpty({ 
        message: "The value of the username field cannot be empty" 
    })
	@IsString({ 
        message: "The user entered is not valid"
    })
	username: string;

	@IsNotEmpty({ 
        message: "The value of the password field cannot be empty" 
    })
	@Length(8)
	password: string;

	@IsNotEmpty({
        message: "The value of the role field cannot be empty"
    })
	@IsString({ 
        message: "The role entered is not valid" 
    })
	role: string;

}