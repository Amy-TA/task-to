import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IPriority, IStatus, ITask } from 'src/app/domain/models/task.model';
import { Priority, Status } from 'src/app/shared/object-data';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-m-task',
  templateUrl: './m-task.component.html',
  styleUrls: ['./m-task.component.scss']
})
export class MTaskComponent implements OnInit {
  lst: any = [];
  @Input() item: any;

  frmTask: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activeModal: NgbActiveModal,
  ) { 
    this.frmTask = this.fb.group({
      title: ['', Validators.required],
      due_date: ['', Validators.required],
      priority_id: [1, Validators.required],
      status_id: [1],
      description: ['', Validators.required],
    })
  }

  ngOnInit(): void { 
    this.lst = JSON.parse(localStorage.getItem("lstTasks") || '[]'); 
    if(this.item){ this.toComplete(); } 
  }

  toComplete(){ 
    this.frmTask.patchValue(this.item);    
    this.frmTask.get('priority_id')?.patchValue(this.item.priority.id);
    this.frmTask.get('status_id')?.patchValue(this.item.status.id);
    this.frmTask.get('due_date')?.patchValue(this.item.due_date.slice(0,10));
  }

  save(){
    if(this.item){ this.put(); }
    else{ this.post(); }
  }

  post(){
    let priority: IPriority =  JSON.parse(Priority[this.frmTask.get('priority_id')?.value || 1]);        
    let status: IStatus = JSON.parse(Status[1]);
    let nuevo : number = Number(this.lst[this.lst.length - 1].id) + 1;

    let obj : ITask = {
      id: nuevo,
      title: this.frmTask.get('title')?.value || '',
      due_date: this.frmTask.get('due_date')?.value,
      priority: priority,
      status: status,
      description: this.frmTask.get('description')?.value,
      creation_date: new Date().toISOString().slice(0, 10),
      lst_labels: []
    }

    this.lst.push(obj);

    localStorage.setItem('lstTasks', JSON.stringify(this.lst));
    this.activeModal.close('Success');

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Registro agregado con éxito.",
      showConfirmButton: false,
      timer: 1500
    });
  }

  put(){
    let obj: ITask = this.lst.find((tsk: { id: any; }) => tsk.id === this.item.id);

    let priority: IPriority =  JSON.parse(Priority[this.frmTask.get('priority_id')?.value || 1]);
    let status: IStatus = JSON.parse(Status[this.frmTask.get('status_id')?.value || 1]);

    obj.title = this.frmTask.get('title')?.value || '';
    obj.due_date = this.frmTask.get('due_date')?.value;
    obj.priority = priority;
    obj.status = status;
    obj.description = this.frmTask.get('description')?.value,
    obj.lst_labels = this.item.lst_labels;

    localStorage.setItem('lstTasks', JSON.stringify(this.lst));
    this.activeModal.close('Success');
    
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Registro actualizado con éxito.",
      showConfirmButton: false,
      timer: 1500
    });
  }

  close(){ this.activeModal.close(); }
}
