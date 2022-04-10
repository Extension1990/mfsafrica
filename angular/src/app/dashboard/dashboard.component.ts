import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';

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
  opened: -1;

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
     if(transaction) {
      this.getTransactions();
      this.successUpdateAlert();
     } else {
       this.errorUpdateAlert();
     }
    })
  }

  resetForm() {
    this.status = '';
    this.movement_type = '';
  }

  deleteTransaction(id: number) {
    this.service.deleteTransaction(id).subscribe((transaction: any) => {
      if(transaction) {
        this.getTransactions();
        this.successDeleteAlert();
      } else {
        this.errorDeleteAlert();
      }
    })
  }

  toggleAmount(transaction: any) {
      transaction.hide = !transaction.hide;
  }

  successUpdateAlert() {
    Swal.fire({
      text: 'Updated successfully.',
      icon: 'success',
      confirmButtonColor: '#001F30'
    })
  }

  errorUpdateAlert() {
    Swal.fire("Error", 'Could not update transaction!', 'error');
  }

  successDeleteAlert() {
    Swal.fire({
      text: 'Deleted successfully.',
      icon: 'success',
      confirmButtonColor: '#001F30'
    })
  }

  errorDeleteAlert() {
    Swal.fire("Error", 'Could not delete transaction!', 'error');
  }

}
