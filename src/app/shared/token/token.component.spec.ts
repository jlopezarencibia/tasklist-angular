import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenComponent } from './token.component';
import * as test from 'Test';

describe('TokenComponent', () => {
  let component: TokenComponent;
  let fixture: ComponentFixture<TokenComponent>;

  it('Mentions should be identified and trimmed', () => {
    const text = '@mention';
    expect(component.isMention(text))
      .withContext('when the word starts with @')
      .toBeTrue();
  });

  it ('Mentions should be trimmed by the @', () => {
    const text = '@mention';
    expect(text.length)
      .withContext('Trimming @')
      .toBeGreaterThan(component.trimAtSign(text).length);
  })

  it('Hashtags should be identified and trimmed', () => {
    const text = '#hashtag';
    expect(component.isHashtag(text))
      .withContext('when the word starts with #')
      .toBeTrue()
  })

  it ('Hashtags should be trimmed by the #', () => {
    const text = '#hashtag';
    expect(text.length)
      .withContext('Trimming #')
      .toBeGreaterThan(component.trimHashSign(text).length);
  })

  it('Emails should be identified as email', () => {
    const text = 'johndoe@gmail.com';
    expect(component.isEmail(text))
      .withContext('it contains an @ sign in the middle')
      .toBeTrue();
  })

  it('Emails should fail identifying as mentions', () => {
    const text = 'johndoe@gmail.com';
    expect(component.isMention(text))
      .withContext('passing an email')
      .toBeFalse();
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
