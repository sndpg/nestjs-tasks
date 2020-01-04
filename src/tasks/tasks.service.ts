import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = [{ taskId: '1' }, { taskId: '2' }, { taskId: '3' }];

  getAll() {
    return this.tasks;
  }

}
