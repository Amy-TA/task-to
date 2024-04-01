import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITask } from 'src/app/domain/models/task.model';
import Swal from 'sweetalert2';
import { MLabelsComponent } from '../m-labels/m-labels.component';

@Component({
  selector: 'app-taks-detail',
  templateUrl: './taks-detail.component.html',
  styleUrls: ['./taks-detail.component.scss']
})
export class TaksDetailComponent implements OnInit {

  id!: number;
  edit: boolean = false;
  lst: any = [];
  item : ITask | undefined;

  frmTask: FormGroup;

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) 
  { 
    this.frmTask = this.fb.group({
      title: ['', Validators.required],
      due_date: ['', Validators.required],
      priority_id: [1, Validators.required],
      status_id: [1],
      description: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {      
      const idParam = params.get('id');
      if (idParam !== null) { this.id = Number(idParam); }
    });

    this.lst = JSON.parse(localStorage.getItem("lstTasks") || '[]'); 
    this.item = this.lst.find((tsk: { id: any; }) => tsk.id == this.id);
    
    this.toComplete();
  }

  toComplete(){ 
    if(this.item){
      this.frmTask.patchValue(this.item);    
      this.frmTask.get('priority_id')?.patchValue(this.item.priority.id);
      this.frmTask.get('status_id')?.patchValue(this.item.status.id);
      this.frmTask.get('due_date')?.patchValue(this.item.due_date.slice(0,10));
    }
  }

  build_forms(){
    const formControls = Object.keys(this.frmTask.controls);

    formControls.forEach(controlName => {
      const control: AbstractControl | null = this.frmTask.get(controlName);

      if (control) {
        if (this.edit) { control.enable(); } 
        else { control.disable(); }
      }
    });
  }

  put(edit : boolean){
    if (edit)
    {
      this.edit = true;
      this.build_forms();
    }
    else{
      if(this.item){
        let obj: ITask = this.lst.find((tsk: { id: any; }) => tsk.id === this.item?.id);

        obj.lst_labels = this.item.lst_labels;
    
        localStorage.setItem('lstTasks', JSON.stringify(this.lst));
        
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registro actualizado con éxito.",
          showConfirmButton: false,
          timer: 1500
        });
  
        this.edit = false;
      }
    }
  }

  addLabel(){
    const modalRef = this.modalService.open(MLabelsComponent, {
      ariaLabelledBy: "modal-basic-title",
      centered: true,
    });

    modalRef.result.then(
      (result) => {        
        if (result) {
          this.lst = JSON.parse(localStorage.getItem('lstTasks') || '[]');
          this.item = this.lst.find((tsk: { id: any; }) => tsk.id == this.id);
          this.toComplete();
        }
      },
      (reason) => {
        console.log(reason);
      }
    );

    modalRef.componentInstance.item = this.item;
  }

  back(){
    this.router.navigate([`task`]);
  }
}
