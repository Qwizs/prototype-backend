import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { AdministratorsModule } from './administrators/administrators.module';

@Module({
  imports: [DemoModule, AdministratorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
