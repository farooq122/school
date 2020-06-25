import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Staff } from '../_models/Staff';
import { Observable } from 'rxjs';

@Injectable()
export class StaffService {

  constructor(private httpClient: HttpClient) { }
  create(staff: Staff) {
    return this.httpClient.post('api/staff', staff, {observe: 'response'});
  }
  get(page = 0 , limit = 10, name = '') {
    return this.httpClient.get(`api/staff?page=${page}&limit=${limit}&name=${name}`, {observe: 'response'});
  }
  getById(id) {
    return this.httpClient.get(`api/staff/${id}`, {observe: 'response'});
  }
}
