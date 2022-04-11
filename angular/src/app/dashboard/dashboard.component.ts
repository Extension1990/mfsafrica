import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import Swal from 'sweetalert2';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    // animation triggers go here
  ]
})
export class DashboardComponent implements OnInit {

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  transactions: any;
  value_date: string;
  transaction_id: number;
  amount: number;
  status: string;
  movement_type: string;
  searchText: string;
  start: Date = new Date ("10/07/2017"); 
  end: Date = new Date ("11/25/2017");
  hide : boolean = true;

  constructor(private service: MainService, fb: FormBuilder) { 
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
    this.getTransactions();
  }

  // Get all transactions
  getTransactions() {
    this.service.getTransactions().subscribe((transactions: any) => {
      this.transactions = transactions;
    })
  }

  // Edit a specific transaction by id
  editTransaction(id: number, value_date: string, transaction_id: number, amount: number, status: string, movement_type: string, hide: boolean) {
    this.service.editTransaction(id, value_date, transaction_id, amount, status, movement_type, hide).subscribe((transaction: any) => {
     if(transaction) {
      this.getTransactions();
      this.successUpdateAlert();
     } else {
       this.errorUpdateAlert();
     }
    })
  }

  // Delete a specific transaction by id
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

  // Toggle the amount field to hide/show the transaction amount
  toggleAmount(transaction: any) {
      transaction.hide = !transaction.hide;
  }

  // Show success alert when a transaction has been successfully updated
  successUpdateAlert() {
    Swal.fire({
      text: 'Updated successfully.',
      icon: 'success',
      confirmButtonColor: '#001F30'
    })
  }

  // Show error alert when a transaction has not been successfully updated
  errorUpdateAlert() {
    Swal.fire("Error", 'Could not update transaction!', 'error');
  }

  // Show success alert when a transaction has been successfully deleted
  successDeleteAlert() {
    Swal.fire({
      text: 'Deleted successfully.',
      icon: 'success',
      confirmButtonColor: '#001F30'
    })
  }

  // Show error alert when a transaction has been successfully deleted
  errorDeleteAlert() {
    Swal.fire("Error", 'Could not delete transaction!', 'error');
  }

}
