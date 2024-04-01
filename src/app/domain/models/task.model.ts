export interface ITask{
  id: number;
  title: string;
  due_date: string;
  priority: IPriority;
  status: IStatus;
  description: string;
  creation_date: string;
  lst_labels: ILabels[]
}

export interface ILabels{
  id: number;
  name: string;
  color: string;
  selected?: boolean;
}

export interface IPriority{
  id: number;
  name: string;
  color: string;
}

export interface IStatus{
  id: number;
  name: string;
  color: string;
}