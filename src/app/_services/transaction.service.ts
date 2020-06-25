import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../_models/Transaction';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  
  constructor(private httpClient: HttpClient) { }
  create(transaction: Transaction) {
    return this.httpClient.post('api/transaction', transaction, {observe: 'response'});
  }
  get( staffId, date) {
    return this.httpClient.get(`api/transaction/staff/${staffId}?date=${date}`, {observe: 'response'});
  }
  getById(id) {
    return this.httpClient.get(`api/transaction/${id}`, {observe: 'response'});
  }


}
