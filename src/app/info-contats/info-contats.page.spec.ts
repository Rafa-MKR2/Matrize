import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoContatsPage } from './info-contats.page';

describe('InfoContatsPage', () => {
  let component: InfoContatsPage;
  let fixture: ComponentFixture<InfoContatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoContatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoContatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
