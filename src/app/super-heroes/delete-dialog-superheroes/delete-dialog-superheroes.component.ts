import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuperHeroesService } from '../super-heroes.service';

@Component({
  selector: 'app-delete-dialog-superheroes',
  templateUrl: './delete-dialog-superheroes.component.html',
  styleUrls: ['./delete-dialog-superheroes.component.css']
})
export class DeleteDialogSuperheroesComponent {

  constructor(public dialogRef:MatDialogRef<DeleteDialogSuperheroesComponent> , @Inject(MAT_DIALOG_DATA) public data:any , private superHeroService:SuperHeroesService){}

  confirmDelete(){
    this.superHeroService.delete(this.data.id).subscribe(()=>{
      this.dialogRef.close(this.data.id);
    })
  }
}
