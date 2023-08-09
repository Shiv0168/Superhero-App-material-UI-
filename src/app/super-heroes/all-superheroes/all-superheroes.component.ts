import { Component, OnInit } from '@angular/core';
import { SuperHeroesService } from '../super-heroes.service';
import { SuperHeroes } from '../super-heroes';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogSuperheroesComponent } from '../delete-dialog-superheroes/delete-dialog-superheroes.component';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-superheroes',
  templateUrl: './all-superheroes.component.html',
  styleUrls: ['./all-superheroes.component.css'],
})
export class AllSuperheroesComponent implements OnInit {
  allSuperheroes: SuperHeroes[] = [];
  sortingControl = new FormControl('');
  searchControl = new FormControl('');
  pageIndex:number = 0;
  pageSize:number = 5;
  totalRecords:number = 0;

  constructor(
    private superHeroService: SuperHeroesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAPI('', '' , '');
    this.sortingControl.valueChanges.subscribe((data) => {
      if(data){
        this.pageIndex = 0;
        this.pageSize = 5;
       let sortData = this.doSorting(data);
       this.getAPI(sortData.sortColumn , sortData.order , (this.searchControl.value ?? ""))
      }
    });
  }

  doSorting(value: string) {
    let sortColumn: string = '';
    let order: string = '';

    if (value === 'id-by-asc') {
      sortColumn = 'id';
      order = 'asc';
    } else if (value === 'id-by-desc') {
      sortColumn = 'id';
      order = 'desc';
    } else if (value === 'franchise-by-asc') {
      sortColumn = 'franchise';
      order = 'asc';
    } else if (value === 'franchise-by-desc') {
      sortColumn = 'franchise';
      order = 'desc';
    } else if (value === 'gender-by-asc') {
      sortColumn = 'gender';
      order = 'asc';
    } else if (value === 'gender-by-desc') {
      sortColumn = 'gender';
      order = 'desc';
    }
    // this.getAPI(sortColumn , order , "");
    return{
      sortColumn,order
    }
  }

  getAPI(sortColumn: string, order: string , searchKey:string) {
    this.superHeroService.get(sortColumn, order , searchKey , (this.pageIndex+1) , this.pageSize).subscribe({
      next: (response) => {
        this.allSuperheroes = response.body as unknown as SuperHeroes[];
        this.totalRecords = response.headers.get('X-Total-Count') ? Number(response.headers.get('X-Total-Count')):0;
      },
    });
  }

  textSearch(){
    this.pageIndex = 0;
    this.pageSize = 5;
    let sortData = this.doSorting(this.searchControl.value ?? "");
    this.getAPI(sortData.sortColumn , sortData.order , (this.searchControl.value ?? ""))
  }

  deleteItem(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogSuperheroesComponent, {
      width: '250px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.allSuperheroes = this.allSuperheroes.filter((s) => s.id !== data);
      }
    });
  }

  handePageEvent(e:PageEvent){
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
      let sortData = this.doSorting(this.searchControl.value ?? "");
      this.getAPI(sortData.sortColumn , sortData.order , (this.searchControl.value ?? ""))
    }
  }

