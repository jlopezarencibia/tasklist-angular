import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import {
  AtSign,
  Calendar,
  ChevronRight,
  Disc,
  Hash,
  Link,
  Loader,
  Mail,
  Maximize2,
  MessageCircle,
  Minimize2,
  PlusSquare,
  Save,
  Square,
  Trash2,
  Unlock,
  User,
  X
} from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';
import { TokenComponent } from './token/token.component';

// Used icons in the app scope
const icons = {
  AtSign,
  Calendar,
  ChevronRight,
  Disc,
  Hash,
  Link,
  Loader,
  Mail,
  Maximize2,
  MessageCircle,
  Minimize2,
  PlusSquare,
  Save,
  Square,
  Trash2,
  Unlock,
  User,
  X
};

@NgModule({
  declarations: [
    TokenComponent
  ],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    FeatherModule.pick(icons),
  ],
  exports: [
    CoreModule,
    ThemeSharedModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    TokenComponent
  ],
  providers: []
})
export class SharedModule {}
