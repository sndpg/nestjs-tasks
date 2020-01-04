import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: '1', status: TaskStatus.OPEN, description: '', title: '' },
    { id: '2', status: TaskStatus.OPEN, description: '', title: '' },
    { id: '3', status: TaskStatus.OPEN, description: '', title: '' },
  ];

  getAll(): Task[] {
    return this.tasks;
  }
}
