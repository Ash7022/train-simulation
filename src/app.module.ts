import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainModule } from './train/train.module';

@Module({
  imports: [TrainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
