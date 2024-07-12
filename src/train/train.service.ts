import { Injectable } from '@nestjs/common';
import { TrainBlock } from './train.model';
import { TrainBlockdto } from './dto';

@Injectable()
export class TrainService {
  private trainBlocksdto: { [key: string]: TrainBlockdto } = {};

    SetTrainBlocks(blocks:{ [key: string]: TrainBlockdto }){
        this.trainBlocksdto = blocks;
    }

    getTrainBlocks(){
        return this.trainBlocksdto;
    }

    getAllActiveBlocks(){
        const ActivetrainBlocks: { [key: string]: TrainBlockdto } = {};
    var currentkey =1;
    for (const key in this.trainBlocksdto) {
      if (this.trainBlocksdto[key].hasOwnProperty('status') && this.trainBlocksdto[key].present_role!=='Engine') {
        if (this.trainBlocksdto[key].status === 'ACTIVE') {
          ActivetrainBlocks[currentkey++] = this.trainBlocksdto[key];
        }
      } else {
        ActivetrainBlocks[currentkey++] = this.trainBlocksdto[key];
      }
    }
    return ActivetrainBlocks;
    }

    getBlockById(id: string) {
        return this.trainBlocksdto[id];
      }
    
      performAction(id: string, role: string, action: string) {
        const block = this.trainBlocksdto[id];
        if (!block) {
          return 'Block not found';
        }
    
        if (block.present_role === 'Engine' && (action === 'Run' || action === 'Stop')) {
          block.status = action;
          return `Engine ${action} action performed`;
        }
    
        if (block.action_by && block.action_by.includes(role)) {
          block.status = action;
    
          // Handle next role actions and default status setting
          const nextRoles = block.next_role;
          if (action === 'ACTIVE' && nextRoles.length > 0) {
            nextRoles.forEach(nextRole => {
              Object.values(this.trainBlocksdto).forEach(tb => {
                if (tb.present_role === nextRole) {
                  tb.status = 'INACTIVE';
                }
              });
            });
            block.status = 'ACTIVE';
          }
    
          return `Action ${action} performed by ${role} on block ${id} with present role ${block.present_role}`;
        } else {
          return `Action by ${role} is not allowed on block ${id}`;
        }
      }
}
