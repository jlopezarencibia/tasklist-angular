import { AuthService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { TaskService } from '@proxy/services';
import { firstValueFrom } from 'rxjs';
import { TodoTaskDto } from '@proxy/services/dtos';
import { EditorMode } from './todo-item/todo-item.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tasks: TodoTaskDto[];
  // flags
  editorOpened = false;

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
    private taskService: TaskService) {
  }

  async ngOnInit() {
    this.tasks = await firstValueFrom(this.taskService.getList());
    this.tasks = this.tasks.reverse();
  }

  login() {
    this.authService.navigateToLogin();
  }

  toggleEditor(value?: boolean) {
    // console.log('set editor to => ', value != undefined ? value : !this.editorOpened);
    this.editorOpened = value != undefined ? value : !this.editorOpened;
  }

  openEditor(index: number) {
    // console.log('open editor');
    // this.refreshEditorArray();
    // this.taskView[index] = true;
    this.editorOpened = true;
  }

  // When clicked on the new item button
  addNewTask(value: TodoTaskDto) {
    if (value) {
      this.tasks.unshift(value);
    }
    this.toggleEditor(false);
  }

  removeTask(value: TodoTaskDto) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === value.id) {
        this.tasks.splice(i, 1);
        break;
      }
    }
    this.toggleEditor(false)
  }

  updateTask(value: TodoTaskDto) {
    for (const task of this.tasks) {
      if (task.id === value.id) {
        task.value = value.value;
      }
    }
    this.toggleEditor(false)
  }
}
