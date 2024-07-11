import { Module } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainController } from './train.controller';

@Module({
  controllers: [TrainController],
  providers: [TrainService],
})
export class TrainModule {}
