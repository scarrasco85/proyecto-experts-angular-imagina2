import { Component, OnInit } from '@angular/core';

// Redux
import { StoreService } from 'src/app/services/store/store.service';
import { ACTION_CHANGE_TITLE_HEADER, ACTION_CHANGE_BUTTON_NEW_HEADER, ACTION_CHANGE_NUM_TOTAL_REGISTERS, ACTION_CHANGE_DIV_TO_LOAD } from 'src/app/store/actions/actions.types';

// DataTable
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

// Service - Model
import { ExpertsService } from '../../services/experts.service';
import { TagsService } from '../../../tags/services/tags.service';
import { Expert } from '../../models/expert.model';
import { Tag } from 'src/app/modules/tags/models/tag.model';



/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-experts-list',
  templateUrl: './experts-list.component.html',
  styleUrls: ['./experts-list.component.scss']
})
export class ExpertsListComponent implements OnInit {

  // Header properties
  title = "Lista de Expertos";
  buttonToLoad = "new_expert_button";
  numTotalRegisters = 0;
  divToLoad = 'experts-list';

  // Local properties
  expertsList: Expert[] = [];
  filterValue: string = "";
  filterParams: any = [
    {
      name: '',
      tag: '',
      modality: '',
      status: '',
      score: '',
      page: 0,
      limit: 5
    },
  ];

  filterParamsTags: any = [
    {
      name: '',
      page: '',
      limit: ''
    },
  ];

  statusSelected: string = '';
  scoreSelected: string = '';

  tagsList: Tag[] = [];
  //****************************** */
  idTag: string = '';

  displayedColumns: string[] = ['name', 'status', 'tag', 'score'];
  displayedFilters: string[] = ['nameFilter', 'statusFilter', 'tagFilter', 'scoreFilter'];
  dataSource: any;

  // // Paginator params
  totalExperts: number = 0;
  arrayOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent = new PageEvent;
  public array: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public start = 0;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
        private storeService: StoreService, 
        private expertsService: ExpertsService,
        private tagsService: TagsService
        ) {

    this.dataSource = new MatTableDataSource<Element>([]);
  }

  ngOnInit(): void {

    // Update title in HeaderState
    this.storeService.updateState({
      type: ACTION_CHANGE_TITLE_HEADER,
      payload: this.title
    });

     // Update title in HeaderState
     this.storeService.updateState({
      type: ACTION_CHANGE_BUTTON_NEW_HEADER,
      payload: this.buttonToLoad
    });

    // Update div to Load in HeaderState
    this.storeService.updateState({
      type: ACTION_CHANGE_DIV_TO_LOAD,
      payload: this.divToLoad
    });

  
    // Filter Params Experts
    this.filterParams.name = '';
    this.filterParams.tag = '';
    this.filterParams.modality = '';
    this.filterParams.status = '';
    this.filterParams.score = '';
    this.filterParams.page = 0;
    this.filterParams.limit = 5;

    // Filter Params Tags
    this.filterParamsTags.name = '';
    this.filterParamsTags.page =  '0';
    this.filterParamsTags.limit = '1';

    // Get Total experts
    this.expertsService.getTotalExperts().subscribe((response) => {
      this.totalExperts = response;
      
      this.paginator.length = response;
    
      // Update totalRegisters in HeaderState
      this.storeService.updateState({
        type: ACTION_CHANGE_NUM_TOTAL_REGISTERS,
        payload: this.totalExperts
      });
    });
     

    // Get experts
    this.expertsService.getAll(this.filterParams).subscribe((response) => {
      
      this.dataSource.paginator = this.paginator;
      this.expertsList = response;
      this.array = response;
      this.totalSize = this.paginator.length;
      this.iterator();

    });

  }

  ngAfterViewInit() {
  
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {

    this.filterParams.name = (event.target as HTMLInputElement).value;
    this.restartPage();
    
    if(this.filterParams.name == '' && this.filterParams.tag == '' && this.filterParams.status == '' && this.filterParams.score == '' ){
      
      this.getNoFilter();


    }else{
     
      this.getWithFilter();
      
    }
    
  }

  applyFilterWithTag(event: Event) {

    this.restartPage();
   
    if(this.filterParamsTags.name != ''){
   
      this.getIdTag((event.target as HTMLInputElement).value);
    }else{
      this.filterParams.tag = '';
    }

    if(this.filterParams.name == '' && this.filterParams.tag == '' && this.filterParams.status == '' && this.filterParams.score == '' ){

      this.getNoFilter();


    }else{
     
      this.getWithFilter();
      
    }

  }

  applyFilterScore(event: Event) {

    this.filterParams.score = (event.target as HTMLInputElement).value;
    this.restartPage();
    
    
    if(this.filterParams.name == '' && this.filterParams.tag == '' && this.filterParams.status == '' && this.filterParams.score == '' ){


      this.getNoFilter();


    }else{
     
      this.getWithFilter();
      
    }
   
  }

  updateFilterName(event: any){

    this.filterParams.name = event.target.value;
   
  }

  updateFilterStatus(event: string){

    this.filterParams.status = event;

    if(this.filterParams.name == '' && this.filterParams.tag == '' && this.filterParams.status == '' && this.filterParams.score == '' ){
       

      this.getNoFilter();


    }else{
     
      this.getWithFilter();
      
    }
  
  }

  updateFilterTag(event: any){

    this.filterParamsTags.name = event.target.value;
    
  }

  updateFilterScore(event: string){

    this.filterParams.score = event;

    if(this.filterParams.name == '' && this.filterParams.tag == '' && this.filterParams.status == '' && this.filterParams.score == '' ){
       

      this.getNoFilter();


    }else{
     
      this.getWithFilter();
      
    }
    
  }

  getColorTag(score:string) { 
    switch (score){ 
    case '15': return '#D66464'; 
    case '25': return '#DEA876'; 
    case '55': return '#F0CE76'; 
    case '75': return '#B1F0A1'; 
    case '100': return '#4ADEBB'; 
    default:  
    return '#C7C8CD'; 
  } 
}

public onPaginateChange(e: PageEvent) {

  this.currentPage = e.pageIndex;
  this.pageSize = e.pageSize;
  this.filterParams.page = this.currentPage * this.pageSize;
  this.filterParams.limit = this.paginator.pageSize;

  if(this.filterParams.name == '' && this.filterParams.tag == '' && this.filterParams.status == '' && this.filterParams.score == '' ){

    this.getNoFilter();

  }else{

    this.getWithFilter();
    
  }
  
}

private iterator() {
  
  const end = (this.currentPage + 1) * this.pageSize;
  this.start = this.currentPage * this.pageSize;
  const part = this.array.slice(0, end);
  this.dataSource = part;

  this.filterParams.page = this.start;
  this.filterParams.limit = this.pageSize;
 
}

restartPage(){
  this.start = 0;
  this.filterParams.page = 0;
}


  private getNoFilter(){
    
     // Get Total experts
     this.expertsService.getTotalExperts().subscribe((response) => {
      this.totalExperts = response;
      this.paginator.length = response;
      this.totalSize = response;
      });
  
      // Get experts by Filters
      
    this.expertsService.getAll(this.filterParams).subscribe((response) => {

      this.array = response;
      this.iterator();
    },
    (error)=> {
      
      this.array = [];
      this.dataSource = [];
    
    });

  }

  private getWithFilter(){

    // Get tags by Filters
    this.expertsService.getAll(this.filterParams).subscribe((response) => {
     
      
      if(response != null){
        
        this.array = response;

        this.paginator.length = response.length;
        this.totalSize = response.length;
       
        this.iterator();
        
        
      }else{
        this.array  = [];
        this.paginator.length = 0;
        this.filterParams.page = 0;
        this.iterator();
      }

    },
    error=> {
      
      this.array = [];
      this.dataSource = [];
    });

  }

  private getIdTag(text:string){

    // Get tagID by Filters
    this.tagsService.getAll(this.filterParamsTags).subscribe((response) => {
     
     this.filterParams.tag = response[0].id.toString();
      
    },
    (error)=> {
      
      this.dataSource = [];
      //this.filterValue = text;
      
    });

  }

}