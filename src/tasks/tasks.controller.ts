import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getAll();
  }

  @Get('/:id')
  getTask(@Param() params) {
    console.log(params.id);
    return { taskId: params.id };
  }
}
