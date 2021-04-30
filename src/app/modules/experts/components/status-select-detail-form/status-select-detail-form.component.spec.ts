import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSelectDetailFormComponent } from './status-select-detail-form.component';

describe('StatusSelectDetailFormComponent', () => {
  let component: StatusSelectDetailFormComponent;
  let fixture: ComponentFixture<StatusSelectDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusSelectDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSelectDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
