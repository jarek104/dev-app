import { Injectable, Type } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { RegisteredDemo } from './types';

@Injectable({
  providedIn: 'root'
})
export class DemoRegistryService {

  registry = new BehaviorSubject<RegisteredDemo | undefined>(undefined);

  constructor() { }

  registerDemo(demo: RegisteredDemo) {
    console.log('register', demo);
    
    this.registry.next(demo);
  }

  // getDemoByUrlPath(path: string): RegisteredDemo {
  //   return this.registry.filter(demo => demo.path === path)[0];
  // }
}
