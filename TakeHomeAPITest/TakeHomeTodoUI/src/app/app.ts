import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { THTA_item } from './app.item';
import { THTA_program } from './app.program';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  template:  `
    <h1>TODO List</h1>

    <input [(ngModel)]="curDesc" placeholder="New Item"/>
    <button (click)="addItem()">Add</button>

    <ul>
      <li *ngFor="let item of items">
        {{ item.itemDesc }}
        <button (click)="deleteItem(item.itemID)">Delete</button>
      </li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  //Establishment of Base Variables
  items: THTA_item[] = [];
  curDesc = '';

  //Construct Program with Angular detector
  constructor(private program: THTA_program, private changeDetector: ChangeDetectorRef) {}

  //Initilisation of Values into website on connection.
  ngOnInit() {
      this.getAll();
  }

  //Get all To-do list values from C# server through constructed Angular TS program.
  getAll() {
    this.program.THTA_getAll().subscribe((x)=>{this.items=x; this.changeDetector.detectChanges();});
  }

  //Add item to To-do list values if contains valid string.
  addItem() {
    if (!this.curDesc.trim()) return; //exits addItem() function if empty or full of spaces.

    this.program.THTA_addItem(this.curDesc).subscribe(()=> {
      this.curDesc = '';
      this.getAll();
    })
  }

  //Delete item from To-do list as per specific button pressed in UI.
  deleteItem(itemID: string) {
    this.program.THTA_deleteItem(itemID).subscribe(()=>this.getAll());
  }
}
