import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location} from '@angular/common'
import { Expert } from '../../../models/expert.model';

// Reactive Forms
import { FormGroup, FormBuilder, FormControl, Validators, MaxLengthValidator } from '@angular/forms';
import { ExpertsService } from '../../../services/experts.service';
import { Tag } from 'src/app/modules/tags/models/tag.model';

import { MatSnackBar } from '@angular/material/snack-bar';

interface Expert2 {
    name: string,
    availability: string,
    contactPhone: string,
    contactEmail: string,
    contactCity: string,
    contactLinkedin: string,
    nif: string,
    status: string,
    tagListSeleted: Tag [],
}

@Component({
  selector: 'app-create-expert-form',
  templateUrl: './create-expert-form.component.html',
  styleUrls: ['./create-expert-form.component.scss']
})
export class CreateExpertFormComponent implements OnInit {

    createExpertForm: FormGroup = this.formBuilder.group({
        name: [ '', Validators.required ],
        availability: [ ''],
        contactPhone: [ '', Validators.compose([ 
              Validators.required,
              Validators.pattern("^([0-9]{1,3}[\.\-\s]??){5}$")
            ])],
        contactEmail: ['', Validators.compose([ Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required])],
        contactCity: [ '', Validators.required],
        contactLinkedin: [ ''],
        nif: ['', Validators.compose([
          Validators.required,
          Validators.minLength(9), Validators.maxLength(9)])]
      });


  tagListSelected: Tag[] = [];
  expertToCreate: Expert = {
    id: undefined,
    name: '',
    createdAt: new Date(),
    updatedAt: undefined,
    statusMotive: '',
    modality: undefined,
    freelance: undefined,

    availability: '',
    contactPhone: '',
    contactEmail: '',
    contactCity: '',
    contactLinkedin: '',
    conditionsPercent: undefined,
    conditionsPriceHour: undefined,
    score: '',
    nif: '',
    emailCredentials: '',
    emailCredentialsPassword: '',
    zoomCredentials: '',
    zoomCredentialsPassword: '',
    photoFile: '',
    cvFile: '',
    observations: '',
    origin: '',
    status: 'pendiente',
    tags: this.tagListSelected
  };
  idTagSelected: string = ''; 

  tagIdListToAdd: string[] = [];
  tagListDB: [{value:string, viewValue: string}] = [{value:'', viewValue:''}];

  availabilitySelected: string = '';
  tagSelected: {value:string, viewValue: string} ={value:'', viewValue:''};

    //Validators
    patterPhone: string = "^([0-9]{1,3}[\.\-\s]??){5}$";
    formValidate: boolean = false;

  constructor( 
    private formBuilder: FormBuilder, 
    private expertsService: ExpertsService, 
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.tagListSelected = [];

    this.createExpertForm.reset({
        name: '',
        availability: '',
        contactPhone: '',
        contactEmail: '',
        contactCity: '',
        contactLinkedin: '',
        nif: ''
    });   
  }

  campoEsValido( campo: string ) {

    return this.createExpertForm.controls[campo].errors 
            && this.createExpertForm.controls[campo].touched;
  }

  newExpert(): void {

    if ( this.createExpertForm.invalid )  {
      this.createExpertForm.markAllAsTouched();
      return;
    }

  
    this.expertToCreate = this.createExpertForm.value;
    this.expertToCreate.availability = this.availabilitySelected;
    this.expertToCreate.tags = this.tagListSelected;
  
    // Create a new Expert
    this.expertsService.createExpert(this.expertToCreate).subscribe((response) => {
        
        this.snackBar.open('Experto creado correctamente', "", {
          duration: 3 * 1000,
        });

        this.router.navigate(['/experts'])

    },
    (error)=> {
        
      this.snackBar.open('Error al crear el experto', "", {
        duration: 3 * 1000,
      });


        
    });

    this.createExpertForm.reset();

  }

  updateAvailability(event: string){
    this.availabilitySelected = event;
  
  }

  //** Add It tags selected to List */
  addTagToList(event: Tag){

    this.tagListSelected.push(event);
   
  }

  deleteTagSeleted(tagDelete: Tag){

  
   
    this.tagListSelected.forEach((tag,index)=>{
        if(tag.id == tagDelete.id){
           
            this.tagListSelected.splice( index, 1) ;
          
        }
    });
    this.expertToCreate.tags = this.tagListSelected;
  
  }

}