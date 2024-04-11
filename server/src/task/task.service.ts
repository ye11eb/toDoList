import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    await this.taskRepository.save({
      task: createTaskDto.task,
      stage: createTaskDto.stage
    })  
    return {status: 201};
  }

  async findAll() {
    const tasks = await this.taskRepository.find()
    return tasks;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { stage } = updateTaskDto;

    const result = await this.taskRepository.update(id, { stage });

    if (result.affected === 0) {
      throw new Error(`Task with ID ${id} not found`);
    }
    
    return {status: 200};
  }

  async remove(id: string) {
    const taskId = parseInt(id);
    await this.taskRepository.delete(taskId)

    return {status: 200};
  }
}
