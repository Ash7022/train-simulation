import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TrainBlock } from './train.model';
import { TrainService } from './train.service';
import { TrainBlockdto } from './dto';

@Controller('train')
export class TrainController {
    constructor (private readonly TrainService: TrainService){}
    @Post()
    SetTrainBlocks(@Body() blocks:{ [key: string]: TrainBlockdto }){
        this.TrainService.SetTrainBlocks(blocks);
        return { message: 'Train blocks set successfully' };
    }
    @Get()
    getTrainblocks(){
        return this.TrainService.getTrainBlocks();
    }

    @Get('active')
    getAllActiveBlocks() {
    return this.TrainService.getAllActiveBlocks();
    
  }
  @Get(':id')
  getBlockById(@Param('id') id: string){
    return this.TrainService.getBlockById(id);
  }

  

  @Post(':id/action')
  performAction(
    @Param('id') id: string,
    @Body('role') role: string,
    @Body('action') action: string,
  ) {
    return this.TrainService.performAction(id, role, action);
  }
}
