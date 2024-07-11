// src/train/train.controller.ts
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainBlock } from './train.model';

@Controller('train')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Post()
  setTrainBlocks(@Body() blocks: { [key: string]: TrainBlock }) {
    this.trainService.setTrainBlocks(blocks);
    return { message: 'Train blocks set successfully' };
  }

  @Get()
  getAllBlocks(): { [key: string]: TrainBlock } {
    return this.trainService.getAllBlocks();
  }
  @Get('active')
  getAllActiveBlocks(): { [key: string]: TrainBlock } {
    return this.trainService.getAllActiveBlocks();
  }

  @Get(':id')
  getBlockById(@Param('id') id: string): TrainBlock {
    return this.trainService.getBlockById(id);
  }

  

  @Post(':id/action')
  performAction(
    @Param('id') id: string,
    @Body('role') role: string,
    @Body('action') action: string,
  ): string {
    return this.trainService.performAction(id, role, action);
  }
}
