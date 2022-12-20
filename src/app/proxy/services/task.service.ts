import type { TodoTaskDto } from './dtos/models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  apiName = 'Default';
  

  create = (value: string, creationDate: string) =>
    this.restService.request<any, TodoTaskDto>({
      method: 'POST',
      url: '/api/app/task',
      params: { value, creationDate },
    },
    { apiName: this.apiName });
  

  delete = (id: number) =>
    this.restService.request<any, TodoTaskDto>({
      method: 'DELETE',
      url: `/api/app/task/${id}`,
    },
    { apiName: this.apiName });
  

  getList = () =>
    this.restService.request<any, TodoTaskDto[]>({
      method: 'GET',
      url: '/api/app/task',
    },
    { apiName: this.apiName });
  

  update = (input: TodoTaskDto) =>
    this.restService.request<any, TodoTaskDto>({
      method: 'PUT',
      url: '/api/app/task',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
