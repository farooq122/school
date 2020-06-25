import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StaffService } from '../_services/staff.service';
import { NotifyService } from '../_services/notify.service';
import { Staff } from '../_models/Staff';
import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { TransactionService } from '../_services/transaction.service';
import { Transaction } from '../_models/Transaction';
import * as moment from 'moment'
@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {
staffId = null;
staff : Staff = null;

todayDate = new Date(Date.now());
date = this.todayDate;

isFormSubmitted = false;
form: FormGroup;

transactions: Transaction[] = null;
sentTransactions: Transaction[] = null;
receivedTransactions: Transaction[] = null;

@ViewChild('addnewTransaction') addnewTransaction: TemplateRef<any>;
  constructor(private route:ActivatedRoute,private datePipe: DatePipe,
    private ngBModal: NgbModal, private formBuilder: FormBuilder, 
    private staffService: StaffService, private notifyService: NotifyService,
    private transactionService: TransactionService
   
    ) {

   }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.staffId = params['id'];
      this.get();
      this.getTransactions();
      this.create();
    }
  )
  }
  create(){
    this.form = this.formBuilder.group({
      type: ['', Validators.required],
      decription : ['',Validators.required],
      amount : ['', Validators.required],
      date: [this.todayDate, [Validators.required, this.validate]],
      staff: [this.staffId]
    });
  }
  validate(control: FormControl): { [key: string]: any } {
    const val = moment(control.value, "dd/MM/yyyy", true);

    if (!val.isValid()) {
      return { invalidDate: true };
    }

    return null;
  }
  get f() {return this.form.controls;}

  get isToday() {
    return (this.datePipe.transform(this.date,"dd/MM/yyyy") == this.datePipe.transform(this.todayDate,"dd/MM/yyyy"));}

  get() {
    this.staffService.getById(this.staffId).subscribe((res: any) => {
      if(+res.status === 200) {
        this.staff = res.body.staff;
      }
    })
  }
  getTransactions() {
    this.transactionService.get(this.staffId, new Date(this.date)).subscribe((res: HttpResponse<any>) => {
      console.log('res', res)
      if(+res.status === 200) {
        this.transactions = res.body.transaction
        this.sentTransactions =this.transactions?  this.transactions.filter((element: Transaction)=> element.type === 'Sent'): [];
        this.receivedTransactions =this.transactions? this.transactions.filter((element: Transaction)=> element.type === 'Received'): [];
        
      }
    })
  }
  
  get sentTotal() { return this.sentTransactions?  this.sentTransactions.reduce((acc, val) => acc += +val.amount, 0): 0}
  get receivedTotal() { return this.receivedTransactions? this.receivedTransactions.reduce((acc, val) => acc += +val.amount, 0) : 0}
 
  addTransaction(type) {
    if(this.form) {
      this.form.controls.type.patchValue(type);
      this.ngBModal.open(this.addnewTransaction);
    } else {
      this.notifyService.info('Something went wrong')
    }
  }
  
  close() {
    this.ngBModal.dismissAll();
  }
  onDateChange() {
    this.getTransactions();
  }
  onSubmit() {
    console.log(this.form.value)
    this.isFormSubmitted = true; 
    if(this.form.invalid) {
      return;
    }
    this.transactionService.create(this.form.value as Transaction).subscribe((res: HttpResponse<any>) => {
      console.log('res', res)
      if(+res.status === 200) {
        this.getTransactions();
        this.close();
        this.notifyService.success('Transaction Added');
        this.form.reset();
        this.isFormSubmitted = false;
        this.f.staff.patchValue(this.staffId);
        this.f.date.patchValue(this.todayDate);
      }
    })
  }

}
