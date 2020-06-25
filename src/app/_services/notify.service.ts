import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private notifierService: NotifierService) { }
  success(text: string){
    this.notifierService.notify('success', text);
  }
  info(text: string){
    this.notifierService.notify('info', text);
  }
}
