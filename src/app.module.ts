import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemoModule } from './demo/demo.module';
import { AdministratorsModule } from './administrators/administrators.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './administrators/entities/administrator.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'simform',
      username: 'postgres',
      entities: [Administrator],
      database: 'database',
      synchronize: true,
      logging: true,
    }),
    DemoModule, 
    AdministratorsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
