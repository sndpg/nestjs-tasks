import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { Response } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    return this.tasksService.getAll();
  }

  @Get('/:id')
  getTask(@Param('id') id): Task {
    console.log(id);
    return this.tasksService.get(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @Res() response: Response): void {
    const deletedTask = this.tasksService.delete(id);
    const status = deletedTask ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND;
    response
      .status(status)
      .json('task with id = ' + id + ' does not exist')
      .send();
  }

  @Patch('/:id')
  patchTask(
    @Param('id') id: string,
    @Body() body,
    @Res() response: Response,
  ): void {
    const attributes = new Map<string, any>();
    if (body.description) {
      attributes.set('description', body.description);
    }
    if (body.status) {
      attributes.set('status', TaskStatus[body.status]);
    }
    if (body.title) {
      attributes.set('title', body.title);
    }

    const task = this.tasksService.patch(id, attributes);

    if (task) {
      response.json(task).send();
    } else {
      response
        .status(HttpStatus.NOT_FOUND)
        .json('task with id = ' + id + ' does not exist')
        .send();
    }
  }

  @Patch('/:id/status')
  pathTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
    @Res() response: Response,
  ) {
    const attributes = new Map<string, any>();
    attributes.set('status', status);

    const task = this.tasksService.patch(id, attributes);

    if (task) {
      response.json(task).send();
    } else {
      response
        .status(HttpStatus.NOT_FOUND)
        .json('task with id = ' + id + ' does not exist')
        .send();
    }
  }

  @Post()
  postTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.log(createTaskDto);
    return this.tasksService.create(createTaskDto);
  }
}
