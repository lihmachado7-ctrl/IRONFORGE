import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = signal('IronForge Inventory Management');
}