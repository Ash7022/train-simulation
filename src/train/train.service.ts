// src/train/train.service.ts
import { Injectable } from '@nestjs/common';
import { TrainBlock } from './train.model';

@Injectable()
export class TrainService {
  private trainBlocks: { [key: string]: TrainBlock } = {};

  setTrainBlocks(blocks: { [key: string]: TrainBlock }) {
    this.trainBlocks = blocks;
    
  }

  getAllBlocks() {
    return this.trainBlocks;
  }
  getAllActiveBlocks(): { [key: string]: TrainBlock } {
    const ActivetrainBlocks: { [key: string]: TrainBlock } = {};
    var currentkey =1;
    for (const key in this.trainBlocks) {
      if (this.trainBlocks[key].hasOwnProperty('status') && this.trainBlocks[key].present_role!=='Engine') {
        if (this.trainBlocks[key].status === 'ACTIVE') {
          ActivetrainBlocks[currentkey++] = this.trainBlocks[key];
        }
      } else {
        ActivetrainBlocks[currentkey++] = this.trainBlocks[key];
      }
    }
    return ActivetrainBlocks;
  }
  

  getBlockById(id: string): TrainBlock {
    return this.trainBlocks[id];
  }

  performAction(id: string, role: string, action: string): string {
    const block = this.trainBlocks[id];
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
          Object.values(this.trainBlocks).forEach(tb => {
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
