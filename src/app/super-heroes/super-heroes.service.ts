import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuperHeroes } from './super-heroes';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroesService {
  baseUrl: string = 'http://localhost:3000/superHeroes';

  constructor(private httpClient: HttpClient) {}

  // get() {
  //   return this.httpClient.get<SuperHeroes[]>(`${this.baseUrl}`);
  // }

  get(sortColumn:string  , order:string , searchKey:string , currentPage:number , pageSize:number) {
    let url = `http://localhost:3000/superHeroes?_page=${currentPage}&_limit=${pageSize}`;
    if(sortColumn && order){
      url = `${url}&_sort=${sortColumn}&_order=${order}`
    }
    if(searchKey){
      url = `${url}&q=${searchKey}`;
    }
    return this.httpClient.get<HttpResponse<any>>(url , {observe:'response'});
  }



  add(superHero: SuperHeroes) {
    return this.httpClient.post<SuperHeroes>(`${this.baseUrl}`, superHero);
  }

  edit(superHero: SuperHeroes, id: number) {
    return this.httpClient.put<SuperHeroes>(`${this.baseUrl}/${id}`, superHero);
  }

  delete(id:number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  getById(id:number) {
    return this.httpClient.get<SuperHeroes>(`${this.baseUrl}/${id}`);
  }
}
