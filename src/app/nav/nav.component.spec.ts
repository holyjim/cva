import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { AppMaterialModule } from '../app.material.module';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        AppMaterialModule,
        BrowserAnimationsModule,
      ],
      declarations: [NavComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
