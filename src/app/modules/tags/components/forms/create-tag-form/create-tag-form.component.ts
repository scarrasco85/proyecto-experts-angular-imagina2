import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Reactive Forms
import { FormGroup, FormBuilder, FormControl, Validators, MaxLengthValidator } from '@angular/forms';
import { TagsService } from '../../../services/tags.service';

import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-create-tag-form',
  templateUrl: './create-tag-form.component.html',
  styleUrls: ['./create-tag-form.component.scss']
})
export class CreateTagFormComponent implements OnInit {

  createTagForm: FormGroup = new FormGroup({}); //this.formBuilder.group({});


  tagToCreate: any = {
    name: '',
    creator: ''
  };

  tagCreated: any = {};
 
  
  constructor( 
            private formBuilder: FormBuilder, 
            private tagsService: TagsService, 
            private router: Router,
            private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.createTagForm = this.formBuilder.group({
      name: this.tagToCreate.name,
      creator: this.tagToCreate.creator
    });

     
  }

  /**
   * Create a Tag in DB
   */
   newTag(): void {

    
    this.tagToCreate.name = this.createTagForm.get('name')?.value; 
    this.tagToCreate.creator = this.createTagForm.get('creator')?.value; 

    // Create a new Tag
    this.tagsService.createTag(this.tagToCreate).subscribe((response) => {
     
      this.tagCreated = response;

      this.snackBar.open('Etiqueta creada correctamente', "", {
        duration: 3 * 1000,
      });  
      this.router.navigate(['/tags']);
      

    },
    (error)=> {
      
      this.snackBar.open('Error al crear la etiqueta', "", {
        duration: 3 * 1000,
      }); 
      
    });
        
  }

}
