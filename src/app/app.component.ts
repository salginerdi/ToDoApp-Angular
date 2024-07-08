import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h1>Todo-App</h1>
    @if(!isUpdateFormActive){
    <div>
      <label>Work</label>
      <input [(ngModel)]="work" />
      <button (click)="save()">Save</button>
    </div>
    }@else{
    <div>
      <label>Update Work</label>
      <input (ngModelChange)="onUpdateChanges($event)" [ngModel]="updateWork" />
      <button (click)="update()">Update</button>
    </div>
    }

    <hr />
    <div>
      <ul>
        @for(data of todos; track data){
        <li>
          {{ data }}
          @if(!isUpdateFormActive){
          <button (click)="get($index)">Update</button>
          <button (click)="delete($index)">Delete</button>
          }
        </li>
        }
      </ul>
    </div>
  `,
  styles: [`
    :host {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    h1 {
      color: #333;
      text-align: center;
    }

    div {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      color: #666;
    }

    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      padding: 8px 15px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #45a049;
    }

    hr {
      border: 0;
      border-top: 1px solid #ddd;
      margin: 20px 0;
    }

    ul {
      list-style-type: none;
      padding: 0;
    }

    li {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      margin-bottom: 10px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    li button {
      margin-left: 10px;
    }

    li button:first-of-type {
      background-color: #2196F3;
    }

    li button:first-of-type:hover {
      background-color: #0b7dda;
    }

    li button:last-of-type {
      background-color: #f44336;
    }

    li button:last-of-type:hover {
      background-color: #da190b;
    }
  `]
})
export class AppComponent {
  isUpdateFormActive: boolean = false;
  work: string = '';
  updateWork: string = '';
  updateIndex: number = 0;
  todos: string[] = [];
  save() {
    this.todos.push(this.work);
    this.work = '';
  }
  delete(index: number) {
    this.todos.splice(index, 1);
  }
  get(index: number) {
    this.updateIndex = index;
    this.updateWork = this.todos[index];
    this.isUpdateFormActive = true;
  }

  update() {
    this.todos[this.updateIndex] = this.updateWork;
    this.isUpdateFormActive = false;
  }

  onUpdateChanges(event: any) {
    console.log(event);
  }

}
