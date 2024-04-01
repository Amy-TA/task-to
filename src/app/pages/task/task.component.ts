import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ILabels, IStatus, ITask } from 'src/app/domain/models/task.model';
import { TaskService } from 'src/app/domain/services/Task.service';
import { Label, Priority, Status } from 'src/app/shared/object-data';
import Swal from 'sweetalert2';
import { IPriority } from '../../domain/models/task.model';
import { MTaskComponent } from './m-task/m-task.component';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  lst_tasks : ITask[] = [];
  lst_tasks_filter : ITask[] = [];
  lst_labels : ILabels[] = [];

  frmFilter!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private taskSev: TaskService,
  ) {
    this.frmFilter = this.fb.group({
      status: [0],
      priority: [0],
      due_date: [0],
    })
  }

  ngOnInit(): void {
    //* Acá verificamos ya existe los datos locales sino se llama al servicio que hay generado por defecto *//
    if(localStorage.getItem('lstTasks')){
      this.lst_tasks = JSON.parse(localStorage.getItem('lstTasks') || '[]');
      this.lst_tasks_filter = JSON.parse(localStorage.getItem('lstTasks') || '[]');
    }
    else{
      //* Llamamos al servicio *//
      this.taskSev.get().subscribe( (res: ITask[])=>{      
        //* Recorremos la lista para añadir los datos que faltan con un Enum, esto debido que el servicio no devuelve todos los datos *//
        res.forEach(ele => {
          let priority: IPriority =  JSON.parse(Priority[Math.floor(Math.random() * (3 - 1 + 1) + 1)]);        
          let status: IStatus = JSON.parse(Status[Math.floor(Math.random() * (3 - 1 + 1) + 1)]);
          let label: IStatus = JSON.parse(Label[Math.floor(Math.random() * (3 - 1 + 1) + 1)]);
          
          ele.id = Number(ele.id)
          ele.priority = priority;
          ele.status = status;
          ele.lst_labels.push(label);
        });

        this.lst_labels = [
          {"id":1,"name":"Fe","color":"#337357"},
          {"id":2,"name":"BD","color":"#5E1675"},
          {"id":3,"name":"Be","color":"#EE4266"},
        ]

        this.lst_tasks = res;
        this.lst_tasks_filter = this.lst_tasks;
        localStorage.setItem('lstTasks', JSON.stringify(this.lst_tasks));
        localStorage.setItem('lstLabels', JSON.stringify(this.lst_labels));
      })
    }
  }


  filterStatus(): void {
    this.frmFilter.get('priority')?.patchValue(0);
    this.frmFilter.get('dueDate')?.patchValue(0);

    const status = this.frmFilter!.get('status')!.value;
    
    let filtered:ITask[] = this.lst_tasks.filter(task => task.status.id != 0);

    if(status != 0){      
      if(status == 1){
        filtered.sort((a, b) => a.status.id - b.status.id);
      }
      else{
        filtered.sort((a, b) => b.status.id - a.status.id);
      }

      this.lst_tasks_filter = filtered;
    }
    else{
      this.lst_tasks_filter = this.lst_tasks;
    }
  }

  filterPriority(){
    this.frmFilter.get('status')?.patchValue(0);
    this.frmFilter.get('dueDate')?.patchValue(0);

    const priority = this.frmFilter!.get('priority')!.value;   
    let filtered:ITask[] = this.lst_tasks.filter(task => task.priority.id != 0);

    if(priority != 0){      
      if(priority == 1){
        filtered.sort((a, b) => a.priority.id - b.priority.id);
      }
      else{
        filtered.sort((a, b) => b.priority.id - a.priority.id);
      }

      this.lst_tasks_filter = filtered
    }
    else{
      this.lst_tasks_filter = this.lst_tasks;
    }

    console.log(filtered);
  }
  
  filterDueDate(){
    this.frmFilter.get('status')?.patchValue(0);
    this.frmFilter.get('priority')?.patchValue(0);

    const dueDate = this.frmFilter!.get('due_date')!.value;
    
    let filtered: ITask[] = this.lst_tasks;

    if(dueDate != 0){
      filtered = filtered.filter(task => task.due_date != null);
        
      filtered.sort((a, b) => {
          if (a.due_date && b.due_date) {

            if(dueDate == 1){
              return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
            }
            else{
              return new Date(b.due_date).getTime() - new Date(a.due_date).getTime();
            }

          } else if (!a.due_date && !b.due_date) {
            return 0;
          } else if (!a.due_date) {
            return 1;
          } else {
            return -1;
          }
      });

      this.lst_tasks_filter = filtered;
    }
    else{
      this.lst_tasks_filter = this.lst_tasks;
    }
  }


  /*
    ? Esta función es para abrir el modal correspondiente al agregar o editar un registro 

    ? item Este parámetro es de tipo any y es opcional para que permita al modal diferencia si lo que hará es un agregar o un editar, como también ayudará a autocompletar información de un registro
  */
  openDialog(item ?: any){
    const modalRef = this.modalService.open(MTaskComponent, {
      ariaLabelledBy: "modal-basic-title",
      centered: true,
    });

    modalRef.result.then(
      (result) => {        
        if (result) {
          this.lst_tasks = JSON.parse(localStorage.getItem('lstTasks') || '[]');
          this.lst_tasks_filter = this.lst_tasks;
        }
      },
      (reason) => {
        console.log(reason);
      }
    );

    modalRef.componentInstance.item = item;
  }

  /*
    ? Esta función es para mostrar las optiones de las tarjetas
  */
  iSelect: any = null;
  view_options: boolean[] = new Array(this.lst_tasks.length).fill(false);
  openOption(index: number){
    if(this.view_options[index]){
      this.view_options.fill(false);
    }
    else{
      this.view_options.fill(false);
      this.view_options[index] = !this.view_options[index];
    }
    this.iSelect = index
  }

  /*
    ? Esta función es si doy click fuera del componente me cierre la caja de opciones activas
  */
  @ViewChild('optionsContainer') optionsContainer: ElementRef | undefined;
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {    
    if (this.optionsContainer && !this.optionsContainer.nativeElement.contains(event.target)) {
      if (!this.iSelect) { this.view_options.fill(false); } 
      else { this.iSelect = null; }
    }
  }

  /*
    ? Esta función es para redirigir al detalle de la tarjeta
  */
  detail(id: number){
    this.router.navigate([`task/${id}`]);
  }

  remove(index: number){
    Swal.fire({
      title: "¿Está seguro que quiere eliminar esta tarea?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`,
      customClass: {
        confirmButton: 'btn-primary'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.lst_tasks.splice(index, 1);
        localStorage.setItem('lstTasks', JSON.stringify(this.lst_tasks));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registro eliminado.",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }
}
