import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FeatherModule } from 'angular-feather';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';

@NgModule({
  declarations: [HomeComponent, TodoItemComponent],
  imports: [SharedModule, HomeRoutingModule, FeatherModule, FroalaEditorModule]
})
export class HomeModule {}
