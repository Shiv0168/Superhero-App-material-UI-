import { Component, OnInit } from '@angular/core';
import { SuperHeroesService } from '../super-heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SuperHeroes } from '../super-heroes';

@Component({
  selector: 'app-edit-superheroes',
  templateUrl: './edit-superheroes.component.html',
  styleUrls: ['./edit-superheroes.component.css'],
})
export class EditSuperheroesComponent implements OnInit {

  editSuperHeroForm:any;

  constructor(
    private superHeroService: SuperHeroesService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.editSuperHeroForm = this.fb.group({
      name: [''],
      imageUrl: [''],
      franchise: [''],
      gender: [''],
    });
  }
  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
      this.superHeroService.getById(id).subscribe((data) => {
        this.editSuperHeroForm = this.fb.group({
          name: [data.name],
          imageUrl: [data.imageUrl],
          franchise: [data.franchise],
          gender: [data.gender],
        });
      });
  }

  edit() {
    this.superHeroService
      .edit((this.editSuperHeroForm.value as SuperHeroes),this.activatedRoute.snapshot.params['id'])
      .subscribe((data) => {
        this.route.navigate(["/"]);
      });
  }
}
