import { TestBed } from '@angular/core/testing';
import { NotifyService, Msg } from './notify.service';
import { Chance } from 'chance';

export interface Msg {
  title: string;
  content: string;
  style: string;
}

describe('NotifyService', () => {
  const chance = Chance();
  let title: string;
  let content: string;
  let style: string;
  beforeEach(() => {
    title = chance.string();
    content = chance.string();
    style = chance.string();
    TestBed.configureTestingModule({})
  });

  it('should be created', () => {
    const service: NotifyService = TestBed.get(NotifyService);
    expect(service).toBeTruthy();
  });

  it('should update the message', () => {
    const service: NotifyService = TestBed.get(NotifyService);
    service.update(title, content, style);
    service.msg.subscribe( result => {
      expect(result).toEqual({title, content, style});
    });
  });

  it('should clear the message', () => {
    const service: NotifyService = TestBed.get(NotifyService);
    service.clear();
    service.msg.subscribe( result => {
      expect(result).toBeNull;
    });
  });
});
