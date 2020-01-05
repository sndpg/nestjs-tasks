import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
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
  deleteTask(@Param('id') id: string, @Res() response: Response) {
    const deletedTask = this.tasksService.delete(id);
    const status = deletedTask ? HttpStatus.NO_CONTENT : HttpStatus.NOT_FOUND;
    response.status(status).send();
  }

  @Post()
  postTask(@Body() createTaskDto: CreateTaskDto): Task {
    console.log(createTaskDto);
    return this.tasksService.create(createTaskDto);
  }
}
