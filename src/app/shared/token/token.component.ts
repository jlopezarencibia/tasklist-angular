import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TagEmitValue, WordType } from '../../home/todo-item/todo-item.component';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  @Input() text = '';
  @Output() userClicked = new EventEmitter<TagEmitValue>();
  type: WordType = WordType.regular;

  readonly atRegex = new RegExp('(^|\\W)@\\b([-a-zA-Z0-9._]{1,25})\\b', 'gi');
  readonly hashRegex = new RegExp('(^|\\W)#\\b([-a-zA-Z0-9._]{1,25})\\b', 'gi');
  readonly emailRegex = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?', 'gi');
  readonly urlRegex = new RegExp('[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)', 'gi');

  ngOnInit(): void {
    if (this.text.search(this.atRegex) != -1) {
      this.type = WordType.mention;
      this.text = this.text.replace('@', '');
    } else if (this.text.search(this.hashRegex) != -1) {
      this.type = WordType.hashtag;
      this.text = this.text.replace('#', '');
    } else if (this.text.search(this.emailRegex) != -1) {
      this.type = WordType.email;
    } else if (this.text.search(this.urlRegex) != -1) {
      this.type = WordType.url;
      this.text = this.text.replace('https://', '').replace('http://', '').replace('www.', '');

    }
  }

  emit() {
    this.userClicked.emit({ type: this.type, value: this.text });
  }

  getIcon() {
    switch (this.type) {
      case WordType.mention:
        return 'at-sign';
      case WordType.hashtag:
        return 'hash';
      case WordType.email:
        return 'mail';
      case WordType.url:
        return 'link';
    }
  }


}
