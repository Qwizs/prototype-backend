import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaDto } from './create-media.dto';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
      @IsNotEmpty()
      @IsString()
      @IsIn(['image', 'video', 'audio'])
      @ApiProperty({
        description: 'The type of the media',
        example: "audio",
        type: String,
      })
      type: string;
    
      @IsNotEmpty()
      @IsString()
      @ApiProperty({
        description: 'The content of the media',
        example: "Chemin1Audio1",
        type: String,
      })
      content: string;
}
