import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrganizers } from './manage-organizers';

describe('ManageOrganizers', () => {
  let component: ManageOrganizers;
  let fixture: ComponentFixture<ManageOrganizers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageOrganizers],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageOrganizers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
