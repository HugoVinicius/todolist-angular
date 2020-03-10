import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public listTodo: Todo[] = [];
  public formPrincipal: FormGroup;
  public opcaoTela = 'list';

  constructor(private fb: FormBuilder) {
    this.formPrincipal = this.fb.group({
      title: ['', Validators.compose([Validators.minLength(3),
                  Validators.maxLength(60),
                  Validators.required
       ])]
    });

    this.carregarLocalStorage();
  }

  ngOnInit(): void {
  }

  markDone(todo: Todo){
    todo.done = true;
    this.salvarLocalStore();
  }

  markUnDone(todo: Todo){
    todo.done = false;
    this.salvarLocalStore();
  }

  deleteTodo(todo: Todo){
    const index: number = this.listTodo.indexOf(todo);

    if (index !== -1){
      this.listTodo.splice(index, 1);
      this.salvarLocalStore();
    }
  }

  adicionarTodo(){
    const title = this.formPrincipal.controls.title.value;
    const id = this.listTodo.length + 1;

    this.listTodo.push(new Todo(id, title, false));

    this.salvarLocalStore();
    this.formPrincipal.reset();
    this.alterarVisuazacao();
  }

  salvarLocalStore(){
    localStorage.setItem('listTodo', JSON.stringify(this.listTodo));
  }

  carregarLocalStorage(){
    const data = localStorage.getItem('listTodo');

    if (data) {
      this.listTodo = JSON.parse(data);
    } else {
      this.listTodo = [];
    }
  }

  alterarVisuazacao(){
    if (this.opcaoTela === 'list') {
      this.opcaoTela = 'add';
    } else {
      this.opcaoTela = 'list';
    }
  }
}
