import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeedback } from './manage-feedback';

describe('ManageFeedback', () => {
  let component: ManageFeedback;
  let fixture: ComponentFixture<ManageFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageFeedback],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageFeedback);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
