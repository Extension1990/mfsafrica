import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  transactions: any;
  searchText: string = '';

  constructor(private service: MainService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.service.getTransactions().subscribe((transactions: any) => {
      this.transactions = transactions;
    })
  }

}
