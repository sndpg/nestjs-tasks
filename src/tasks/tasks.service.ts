import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  getAll() {
    return [{ taskId: '1' }, { taskId: '2' }, { taskId: '3' }];
  }
}
