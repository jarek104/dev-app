import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class DemoDataService {

  data = new BehaviorSubject({});

  constructor() { }


}