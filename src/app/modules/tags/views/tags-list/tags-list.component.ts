import { Component, Input, OnInit } from '@angular/core';

// Redux
import { StoreService } from 'src/app/services/store/store.service';
import { ACTION_CHANGE_TITLE_HEADER, ACTION_CHANGE_BUTTON_NEW_HEADER, ACTION_CHANGE_NUM_TOTAL_REGISTERS, ACTION_CHANGE_DIV_TO_LOAD } from 'src/app/store/actions/actions.types';
import HeaderState from 'src/app/store/config/header/headerState.interface';

// DataTable
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


// Service - Model
import { TagsService } from '../../services/tags.service';
import { Tag } from '../../models/tag.model';

// Confirm component
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {

  // Header properties
  title = "Lista de Etiquetas";
  buttonToLoad = "new_tag_button";
  divToLoad = 'tags-list';

  // Local properties
  tagsList: Tag[] = [];
  filter: string = "";
  filterValue: string = "";
  filterParams: {name: string, page: number, limit: number} = 
    {
      name: '',
      page: 0,
      limit: 5
    }
  ;



  displayedColumns: string[] = ['name', 'creator', 'createdAt'];
  displayedFilters: string[] = ['nameFilter', 'creatorFilter', 'createdAtFilter'];
 
  dataSource: any;
  

  tagToDelete: any = {
    id: -1,
    name: '',
    creator: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }


  // Paginator params
  totalTags: number = 0;
  arrayOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent = new PageEvent;
  public array: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;
  public start = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private storeService: StoreService, 
              private tagsService: TagsService, 
              public dialog: MatDialog ) {

   this.dataSource = new MatTableDataSource<any>([]);

  }

  ngOnInit(): void {
    // Update title in HeaderState
    this.storeService.updateState({
      type: ACTION_CHANGE_TITLE_HEADER,
      payload: this.title
    });

     // Update button in HeaderState
     this.storeService.updateState({
      type: ACTION_CHANGE_BUTTON_NEW_HEADER,
      payload: this.buttonToLoad
    });

     // Update div to Load in HeaderState
     this.storeService.updateState({
      type: ACTION_CHANGE_DIV_TO_LOAD,
      payload: this.divToLoad
    });

    this.filterParams.name = '';
    this.filterParams.page = 0;
    this.filterParams.limit = 5;


    // Get Total tags
    this.tagsService.getTotalTags().subscribe((response) => {

      this.totalTags = response;
      this.paginator.length = response;

      // Update totalRegisters in HeaderState
      this.storeService.updateState({
        type: ACTION_CHANGE_NUM_TOTAL_REGISTERS,
        payload: this.totalTags
      });
    });

    // Get tags
    this.tagsService.getAll(this.filterParams).subscribe((response) => {

      this.dataSource.paginator = this.paginator;
      this.tagsList = response;
      this.array = response;
      this.totalSize = this.paginator.length;
      this.iterator();

    });

  }

  
  ngAfterViewInit() {
   
    this.dataSource.sort = this.sort;
   
  }

  applyFilterName(event: Event) {
  
    this.filterParams.name = (event.target as HTMLInputElement).value;
    this.restartPage();
    
    
    if(this.filterParams.name == '' ){
       

      this.getNoFilter();


    }else{
     
      this.getWithFilter();
      
    }
  }

  onPaginateChange(e: PageEvent) {

    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.filterParams.page = this.currentPage * this.pageSize;
    this.filterParams.limit = this.paginator.pageSize;

    if(this.filterParams.name == ''){

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
    
    
    // Get Total tags
    this.tagsService.getTotalTags().subscribe((response) => {
     this.totalTags = response;
     this.paginator.length = response;
     this.totalSize = response;
     
     });
    
   this.tagsService.getAll(this.filterParams).subscribe((response) => {
    
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
  this.tagsService.getAll(this.filterParams).subscribe((response) => {

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
  (error)=> {
  
    this.array = [];
    this.dataSource = [];
    this.filterValue = this.filterParams.name;
      
  });

}

  deleteTag(tag:any){

     
      const dialog = this.dialog.open( ConfirmComponent, {
        data: tag
      });

  
      dialog.afterClosed().subscribe(
        (result) => {
  
          if( result ) {
            this.tagsService.deleteTagById( tag.id! )
              .subscribe( resp => {

                this.getNoFilter();
               
                
              },(error)=> {
  
                this.getNoFilter();
               
              });
          }
          
        }
      )
  }
  
}