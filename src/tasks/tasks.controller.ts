import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Post()
  postTask(@Body() body): Task {
    console.log(body);
    return this.tasksService.create(body.title, body.description);
  }
}
