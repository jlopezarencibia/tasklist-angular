import { AuthService } from '@abp/ng.core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { TaskService } from '@proxy/services';
import { firstValueFrom } from 'rxjs';
import { TodoTaskDto } from '@proxy/services/dtos';
import { EditorMode } from './todo-item/todo-item.component';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit{

  tasks: TodoTaskDto[];

  @ViewChild('froala') froala: ElementRef;
  // flags

  get newMode() {
    return EditorMode.new;
  }

  get editMode() {
    return EditorMode.edit;
  }

  get viewMode() {
    return EditorMode.view;
  }

  constructor(
    private oAuthService: OAuthService,
    private authService: AuthService,
    private taskService: TaskService) {}

  async ngOnInit() {
    this.tasks = await firstValueFrom(this.taskService.getList());
  }

  login() {
    this.authService.navigateToLogin();
  }

  // When clicked on the new item button
  addNewTask(value: TodoTaskDto) {
    if (value) {
      this.tasks.unshift(value);
    }
  }

  removeTask(value: TodoTaskDto) {
    for (let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i].id === value.id) {
        this.tasks.splice(i, 1);
        break;
      }
    }
  }

  updateTask(value: TodoTaskDto) {
    for (const task of this.tasks) {
      if (task.id === value.id) {
        task.value = value.value
      }
    }
  }
}
