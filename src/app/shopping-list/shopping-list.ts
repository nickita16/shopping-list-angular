import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingService, ShoppingItem } from '../shopping'; 

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-list.html',
  styleUrls: ['./shopping-list.css']  
})
export class ShoppingList implements OnInit {
  @Input() items: ShoppingItem[] = [];
  private shoppingService = inject(ShoppingService);

  // items: ShoppingItem[] = [];
  @Input() errorMessage = '';
  @Input() successMessage = '';

  ngOnInit() {
    this.shoppingService.getItems().subscribe({
      next: (data) => this.items = data,
      error: () => this.errorMessage = 'Ошибка загрузки данных с сервера'
    });
  }

  loadItems() {
  this.shoppingService.getItems().subscribe({
    next: (data) => this.items = data,
    error: () => this.errorMessage = 'Error loading list'
  });
}

  deleteItem(id: number | undefined) {
  if (!id) return;

  this.shoppingService.deleteItem(id).subscribe({
    next: () => {
      this.successMessage = 'Item successfully deleted';
      this.loadItems(); 
    },
    error: () => {
      this.errorMessage = 'ERROR delete';
    }
  });
}
}
