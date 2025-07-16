import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShoppingItem {
  id?: number;
  name: string;
  description: string;
  price: number;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class ShoppingService {
  private apiUrl = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient) {}

  getItems(): Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>(this.apiUrl);
  }

  addItem(item: ShoppingItem): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
