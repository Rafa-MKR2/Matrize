import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeOrdemPage } from './edite-ordem.page';

describe('EditeOrdemPage', () => {
  let component: EditeOrdemPage;
  let fixture: ComponentFixture<EditeOrdemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditeOrdemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeOrdemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
