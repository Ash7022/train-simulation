import { Test, TestingModule } from '@nestjs/testing';
import { TrainController } from './train.controller';

describe('TrainController', () => {
  let controller: TrainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainController],
    }).compile();

    controller = module.get<TrainController>(TrainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
