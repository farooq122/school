import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StaffService } from '../_services/staff.service';
import { Staff } from '../_models/Staff';
import { NotifyService } from '../_services/notify.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  form: FormGroup;
  isFormSubmitted = false;
  staffs :Staff[] = null;
  page = 0;
  limit=10;
  name='';
  @ViewChild('addnewStaff') addnewStaff: TemplateRef<any>;
  constructor(private ngBModal: NgbModal, private formBuilder: FormBuilder, 
    private staffService: StaffService, private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.create();
    this.get();
  }
  get(){
    this.staffService.get(this.page, this.limit, this.name).subscribe((res: any)=> {
      if(+res.status === 200) {
        console.log('res', res)
        this.staffs = res.body.staff as Staff[];
        console.log('this.staffs', this.staffs)
      }
    })
  }
  create(){
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      phone: ['', Validators.required],
      serialNo: ['', Validators.required],
    });
  }
  get f() {return this.form.controls;}
  onClickAdd() {
    this.ngBModal.open(this.addnewStaff);
  }
  close() {
    this.ngBModal.dismissAll();
  }
  onSubmit() {
    this.isFormSubmitted = true; 
    if(this.form.invalid) {
      return;
    }
    this.staffService.create(this.form.value as Staff).subscribe((res: HttpResponse<any>) => {
      console.log('res', res)
      if(+res.status === 200) {
        this.close();
        this.notifyService.success('Staff Added');
      }
    })
  }
}
