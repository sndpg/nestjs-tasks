import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {

  @Get()
  getTasks() {
    return [{ taskId: '1' }, { taskId: '2' }];
  }
}
