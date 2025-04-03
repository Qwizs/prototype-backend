import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';

@Module({
  controllers: [MediasController],
  providers: [MediasService],
  imports: [TypeOrmModule.forFeature([Media])]
})
export class MediasModule {}
