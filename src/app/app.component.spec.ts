import { TestBed } from '@angular/core/testing';
import { CityComponent } from './modules/module.city-component';
describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [CityComponent]});
  });
  it ('should work', () => {
    let fixture = TestBed.createComponent(CityComponent);
    expect(fixture.componentInstance instanceof CityComponent).toBe(true, 'should create AppComponent');
  });
});