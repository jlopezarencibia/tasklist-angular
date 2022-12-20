import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoTaskDto } from '@proxy/services/dtos';
import { TaskService } from '@proxy/services';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  // editor: Quill;
  textInput = '';
  // @ViewChild('NewItem') card: ElementRef;
  @Input() task: TodoTaskDto = { value: '', creationDate: '', id: -1 };

  // format:QuillFormat
  @Input() mode = 'view';
  @Output() whenAddTask = new EventEmitter<TodoTaskDto>();
  @Output() whenRemoveTask = new EventEmitter<TodoTaskDto>();
  @Output() whenUpdateTask = new EventEmitter<TodoTaskDto>();
  @Output() whenCancel = new EventEmitter();
  @Output() clicked = new EventEmitter();


  constructor(private readonly taskService: TaskService) {
  }

  get wordsArray() {
    return this.textInput.split(' ');
  }

  get isModified() {
    return this.task.value !== this.textInput;
  }

  updateText(evt) {
    console.log(evt);
  }

  ngOnInit(): void {
    this.textInput = this.task.value;
    // this.editor = new Quill('.quill', {
    //   placeholder: 'Enter text here...'
    // });
  }

  switchToAddMode() {
    this.mode = EditorMode.add;
  }

  switchToEditMode() {
    this.mode = EditorMode.edit;
  }

  switchToNewMode() {
    this.mode = EditorMode.new;
  }

  switchToDisplayMode() {
    this.mode = EditorMode.view;
  }

  tagClicked(value: TagEmitValue) {
    if (value.type == WordType.regular) {
      this.switchToEditMode();
    }
    console.log(value);
  }

  log(evt) {
    console.log(evt);
    console.log(this.textInput);
    // console.log(this.originalText);
  }

  async action() {
    // this.clicked.emit();
    switch (this.mode) {
      case EditorMode.edit: {
        if (this.textInput == '') {
          console.log('Remove task!');
          const data = await firstValueFrom(this.taskService.delete(this.task.id));
          this.whenRemoveTask.emit(data);
          break;
        }
        if (this.isModified) {
          console.log('Save changes!');
          const newTask = this.task;
          newTask.value = this.textInput;
          const data = await firstValueFrom(this.taskService.update(newTask));
          this.whenUpdateTask.emit(newTask);
          this.switchToDisplayMode();
          break;
        }
        this.doCancel();
        break;
      }
      case EditorMode.add: {
        if (this.textInput !== '') {
          console.log('Add task');
          const data = await firstValueFrom(this.taskService.create(this.textInput, Date.now().toString()));
          this.whenAddTask.emit(data);
          console.log('emitted!');
          this.textInput = '';
          this.switchToNewMode();
          break;
        }
        this.doCancel();
        break;
      }
    }
  }

  doCancel() {
    this.textInput = this.task.value;
    switch (this.mode) {
      case EditorMode.add:
        this.switchToNewMode();
        break;
      case EditorMode.edit:
        this.switchToDisplayMode();
        break;
    }
    this.whenCancel.emit();
  }

  doSave() {

  }

  doAdd() {

  }

  keyInput(key: KeyboardEvent) {
    if (key.code === 'Enter') {
      console.log('Enter pressed');
    }
  }

}

export interface TagEmitValue {
  type: WordType;
  value: string;
}

export enum WordType {
  regular = 'regular',
  mention = 'mention',
  hashtag = 'hashtag',
  email = 'email',
  url = 'url'
}

export enum EditorMode {
  view = 'view',
  new = 'new',
  add = 'add',
  edit = 'edit'
}
