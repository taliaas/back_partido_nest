import { IsInt, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  message: string;

  @IsInt()
  userID: number;
}
