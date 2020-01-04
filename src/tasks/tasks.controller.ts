import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    return this.tasksService.getAll();
  }

  @Get('/:id')
  getTask(@Param() params): Task {
    console.log(params.id);
    return {
      id: params.id,
      title: '',
      description: '',
      status: TaskStatus.OPEN,
    };
  }
}
