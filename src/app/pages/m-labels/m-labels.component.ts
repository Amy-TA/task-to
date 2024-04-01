import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILabels, ITask } from 'src/app/domain/models/task.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-m-labels',
  templateUrl: './m-labels.component.html',
  styleUrls: ['./m-labels.component.scss']
})
export class MLabelsComponent implements OnInit {
  @Input() item: any;
  lst: any = [];
  lst_labels: ILabels[] = [];
  lst_labels_select: ILabels[] = [];

  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.lst = JSON.parse(localStorage.getItem("lstTasks") || '[]'); 
    this.lst_labels = JSON.parse(localStorage.getItem('lstLabels') || '[]');

    this.lst_labels_select = this.lst_labels.map(label => {
      const selected = this.item.lst_labels.some((itemLabel: { id: number; }) => itemLabel.id === label.id);
      return { ...label, selected };
    });

    console.log(this.lst_labels_select);
    
  }

  save(){
    let obj: ITask = this.lst.find((tsk: { id: any; }) => tsk.id == this.item.id);

    obj.title = this.item.title;
    obj.due_date = this.item.due_date;
    obj.priority = this.item.priority;
    obj.status = this.item.status;
    obj.description = this.item.description;
    obj.lst_labels = this.lst_labels_select.filter(l => l.selected != false);

    localStorage.setItem('lstTasks', JSON.stringify(this.lst));
    this.activeModal.close('Success');
    
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Etiquetas actualizadas con éxito.",
      showConfirmButton: false,
      timer: 1500
    });
  }

  onCheckboxChange(event: any, ele : ILabels): void {
    const isChecked = event.target.checked;
    this.lst_labels_select.forEach(item => {
      if (item.id === ele.id) {
        item.selected = isChecked;
      }
    }); 
  }

  close(){ this.activeModal.close(); }
}
