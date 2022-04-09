import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  transactions: any;
  value_date: string;
  transaction_id: number;
  amount: number;
  status: string;
  movement_type: string;
  searchText: string;

  hide : boolean = true;

  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.service.getTransactions().subscribe((transactions: any) => {
      this.transactions = transactions;
    })
  }

  editTransaction(id: number, value_date: string, transaction_id: number, amount: number, status: string, movement_type: string) {
    this.service.editTransaction(id, value_date, transaction_id, amount, status, movement_type).subscribe((transaction: any) => {
      this.resetForm();
      this.getTransactions();
    })
  }

  resetForm() {
    this.status = '';
    this.movement_type = '';
  }

  deleteTransaction(id: number) {
    this.service.deleteTransaction(id).subscribe((transaction: any) => {
      this.getTransactions();
    })
  }

  myFunction() {
    this.hide = !this.hide;
  }

}
