export class Todo {
  id: number;
  title: string;
  done: boolean;

  constructor(id: number, title: string, done: boolean) {
    this.id = id;
    this.title = title;
    this.done = done;
  }
}
