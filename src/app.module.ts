import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { join } from 'path';
import { EnvCofiguration } from './config/env,config';
import { JoiValidationSchema } from './config/joi.config';

@Module({
   imports: [
    ConfigModule.forRoot({
      load: [EnvCofiguration],
      validationSchema: JoiValidationSchema
    })
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
