import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: uuid(), status: TaskStatus.OPEN, description: '', title: '' },
    { id: uuid(), status: TaskStatus.OPEN, description: '', title: '' },
    { id: uuid(), status: TaskStatus.OPEN, description: '', title: '' },
  ];

  constructor() {
    this.tasks.forEach(task => console.log(task));
  }

  getAll(): Task[] {
    return [...this.tasks];
  }

  getAllFiltered(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAll();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        task =>
          task.status.includes(search) ||
          task.description.includes(search) ||
          task.id.includes(search),
      );
    }

    return tasks;
  }

  get(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    return task
      ? task
      : new (class implements Task {
          description: string;
          id: string;
          status: TaskStatus;
          title: string;
        })();
  }

  delete(id: string): Task {
    let deletedTask;
    const index = this.tasks.findIndex(task => task.id === id);
    if (index && index >= 0) {
      deletedTask = this.tasks.splice(index, 1);
    }
    return deletedTask;
  }

  patch(id: string, attributes: any): Task {
    const task = this.tasks.find(task => task.id === id);
    if (task) {
      Object.assign(task, attributes);
    }
    return task;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
