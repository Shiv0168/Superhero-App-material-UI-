import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SuperHeroesService } from '../super-heroes.service';
import { Router } from '@angular/router';
import { SuperHeroes } from '../super-heroes';

@Component({
  selector: 'app-add-superheroes',
  templateUrl: './add-superheroes.component.html',
  styleUrls: ['./add-superheroes.component.css']
})
export class AddSuperheroesComponent {

  constructor(private fb:FormBuilder , private superheroService:SuperHeroesService , private router:Router){}

  addSuperHeroForm = this.fb.group({
    name:[""],
    imageUrl:[""],
    franchise:[""],
    gender:[""]
  })

  create(){
    console.log(this.addSuperHeroForm.value);
    this.superheroService.add((this.addSuperHeroForm.value as SuperHeroes)).subscribe((data)=>{
      this.router.navigate(["/"]);
    })
  }
}
