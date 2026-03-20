import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSponsors } from './manage-sponsors';

describe('ManageSponsors', () => {
  let component: ManageSponsors;
  let fixture: ComponentFixture<ManageSponsors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSponsors],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageSponsors);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
