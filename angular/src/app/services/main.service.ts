import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  // Our json-server mock data api
  private mockApi = "http://localhost:3000";

  // HTTP HeadersOptions
  headers = new HttpHeaders ({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Origin': '*',
  });

  constructor(private httpClient: HttpClient) { }

  // Get all transaction
  getTransactions() {
    return this.httpClient.get(this.mockApi + '/transactions');
  }

  // Edit a specific transaction by id
  editTransaction(id: number, value_date: string, transaction_id: number, amount: number, status: string, movement_type: string, hide: boolean) {
    return this.httpClient.put(`${this.mockApi}/transactions/${id}`, {value_date, transaction_id, amount, status, movement_type, hide});
  }

  // Delete a specific transaction by id
  deleteTransaction(id: number) {
    return this.httpClient.delete(`${this.mockApi}/transactions/${id}`);
  }
}
