import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['image', 'video', 'audio'])
  type: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
