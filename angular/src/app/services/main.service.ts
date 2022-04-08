import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private mockApi = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  getTransactions() {
    return this.httpClient.get(this.mockApi + '/transactions');
  }
}
