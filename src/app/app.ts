import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShoppingList } from "./shopping-list/shopping-list";
import { ShoppingService, ShoppingItem } from './shopping'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [ShoppingList,
    FormsModule,
    
  ]
})
export class App {
  protected readonly title = signal('shopping-list-angular');

  private shoppingService = inject(ShoppingService);

  
  items: ShoppingItem[] = [];
  errorMessage = '';
  successMessage = '';

  newItem: ShoppingItem = {
    name: '',
    description: '',
    price: 0
  };

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.shoppingService.getItems().subscribe({
      next: (data) => this.items = data,
      error: () => this.errorMessage = 'Error loading list'
    });
  }

  addItem() {
    if (!this.newItem.name || !this.newItem.price) {
      this.errorMessage = 'Please fill in the required fields';
      return;
    }

    this.shoppingService.addItem(this.newItem).subscribe({
      next: () => {
        this.successMessage = 'Item added';
        
        this.newItem = { name: '', description: '', price: 0 }; 
        this.loadItems(); 
      },
      error: () => {
        this.errorMessage = 'ERROR add';
      }
    });
  }
}
