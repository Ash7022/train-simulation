export interface TrainBlock {
    start_role: string[];
    action_by?: string[];
    present_role: string;
    next_role: string[];
    actions?: string[];
    status?: string; 
  }
  