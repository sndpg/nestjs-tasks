import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { Response } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    console.log(filterDto);
    if (Object.keys(filterDto).length) {
      return this.tasksService.getAllFiltered(filterDto);
    } else {
      return this.tasksService.getAll();
    }
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
    const task = this.tasksService.patch(id, body);

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
    const task = this.tasksService.patch(id, {status});

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
