import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Location} from '@angular/common'
import { ExpertsService } from '../../../services/experts.service';

// Redux
import { StoreService } from 'src/app/services/store/store.service';
import { ACTION_CHANGE_DIV_TO_LOAD } from 'src/app/store/actions/actions.types';

//Reactive Forms
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Expert } from '../../../models/expert.model';
import { Tag } from 'src/app/modules/tags/models/tag.model';

import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-expert-detail-form',
  templateUrl: './expert-detail-form.component.html',
  styleUrls: ['./expert-detail-form.component.scss']
})
export class ExpertDetailFormComponent implements OnInit {

  // Header properties
  divToLoad = 'expert-detail';

  // Form
  detailExpertForm: FormGroup = new FormGroup({});

  // Local properties
  idExpert: number = 0;

  tagListExpert: Tag[] = [];
  expert: any = {
    id: undefined,
    name: '',
    createdAt: new Date(),
    updatedAt: undefined,
    statusMotive: 'Ninguno',
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
    origin: 'Ninguno',
    status: '',
    tags: this.tagListExpert
  };

  tagListSelected: Tag[] = [];
  tagSelected: {value:string, viewValue: string} ={value:'', viewValue:''};

  //Validators
  patterPhone: string = "^(?:[\+]{1})?(?:\([0-9]{1,2}\) ?)?(?:[0-9] ?-?){6,14}[0-9]$";
  formValidate: boolean = false;

  constructor(
            private activatedRoute: ActivatedRoute, 
            private expertsService: ExpertsService,
            private location: Location,
            private formBuilder: FormBuilder,
            private storeService: StoreService,
            private snackBar: MatSnackBar
          ) { }

  ngOnInit(): void {

    // Update div to Load in HeaderState
    this.storeService.updateState({
      type: ACTION_CHANGE_DIV_TO_LOAD,
      payload: this.divToLoad
    });

    this.tagListExpert  = [];
    this.tagListExpert = [];
   
    if (this.location.getState()) {
      this.expert = this.location.getState();
    }

    this.idExpert = this.activatedRoute.snapshot.params.id;

    this.detailExpertForm = this.formBuilder.group({
      photoFile: [''],
      name: [ this.expert.name, Validators.required ],
      nif: [this.expert.nif , Validators.compose([Validators.minLength(9), Validators.maxLength(9)])],
      contactPhone: [ this.expert.contactPhone, Validators.compose([ 
        Validators.required,
        Validators.pattern("^([0-9]{1,3}[\.\-\s]??){5}$")
      ])],
      contactEmail: [this.expert.contactEmail, Validators.compose([ Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required])],
      contactCity: [ this.expert.contactCity, Validators.required],
      cvFile: [ ''],
      contactLinkedin: [ this.expert.contactLinkedin],
      observations: [ this.expert.observations],
      statusMotive: [ this.expert.statusMotive],
      
     
    });

    if(this.expert.origin == null){
      this.expert.origin = 'Ninguno';
    }
    
    this.tagListSelected = this.expert.tags;

  }

  updateExpert(){

     // Update an Expert
     this.expertsService.updateExpert(this.expert).subscribe((response) => {
        
       this.snackBar.open('Experto actualizado correctamente', "", {
        duration: 3 * 1000,
      });  

   },
   (error)=> {
       
    this.snackBar.open('Error al actualizar el experto', "", {
      duration: 3 * 1000,
    }); 
       
   });

  }

  updateAvailability(event: string){

    this.expert.availability = event;
    this.updateExpert();
  
  }

  updateStatus(event: string){
    this.expert.status = event;
    this.updateExpert();
  }

  updateScore(event: string){
    this.expert.score = event;
    this.updateExpert();
  }

  updateOrigin(event: string){
    this.expert.origin = event;
    this.updateExpert();
  }

  updatePhone(event: Event){
    this.expert.contactPhone = (event.target as HTMLInputElement).value;
    this.updateExpert();
  }

  updateEmail(event: Event){
    this.expert.contactEmail = (event.target as HTMLInputElement).value;
    this.updateExpert();
  }

  updateDirection(event: Event){
    this.expert.contactCity = (event.target as HTMLInputElement).value;
    this.updateExpert();
  }

  updateLinkedin(event: Event){
    this.expert.contactLinkedin = (event.target as HTMLInputElement).value;
    this.updateExpert();
  }

  updateName(event: Event){
    this.expert.name = (event.target as HTMLInputElement).value;
    this.updateExpert();
  }

  updateNif(event: Event){
    this.expert.nif = (event.target as HTMLInputElement).value;
    this.updateExpert();
  }

  updateObservations(event: Event){
    this.expert.observations = (event.target as HTMLInputElement).value;
    this.updateExpert();
  }

  updateStatusMotive(event: Event){
    this.expert.statusMotive = (event.target as HTMLInputElement).value;
    this.updateExpert();
  }

   // Add the selected tags  to List 
   addTagToList(event: Tag){

    if (this.tagListSelected.filter((tag) => tag.id == event.id)[0] == undefined){
       
      this.tagListSelected.push(event);
      
      this.expert.tags = this.tagListSelected;
      this.updateExpert();

      
    }


  }

  deleteTagSeleted(tagDelete: Tag){

    this.tagListSelected.forEach((tag,index)=>{
        if(tag.id == tagDelete.id){
           
            this.tagListSelected.splice( index, 1) ;
          
        }
    });
    this.expert.tags = this.tagListSelected;
    this.updateExpert();
  }


}
