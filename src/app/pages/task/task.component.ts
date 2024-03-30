import { Component, OnInit } from '@angular/core';
import { ITask } from 'src/app/domain/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  lst_tasks : ITask[] = [
    {
      id: 1,
      title: 'Tarea Matemáticas',
      due_date: new Date('2024-04-05'),
      priority_id: 1,
      description: 'Realizar los diez ejercicios de la página 9 del libro de matemáticas I',
      creation_date: new Date('2024-03-30'),
      lst_labels: [
        {
          id: 1,
          name: 'Tareas I',
          color: '#FEF8',
          description: 'Etiqueta para las tareas del ciclo',
        },
      ],
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
