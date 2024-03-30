export interface ITask{
  id: number;
  title: string;
  due_date: Date;
  priority_id: number;
  description: string;
  creation_date: Date;
  lst_labels: Labels[]
}

interface Labels{
  id: number;
  name: string;
  color: string;
  description: string;
}

interface Priority{
  id: number;
  name: string;
  color: string;
  description: string;
}