import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Options {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-status-select-detail-form',
  templateUrl: './status-select-detail-form.component.html',
  styleUrls: ['./status-select-detail-form.component.scss']
})
export class StatusSelectDetailFormComponent implements OnInit {

  selectedValue: string = '';

  @Output() onSelectedValue: EventEmitter<string> = new EventEmitter();
  @Input() texto: string = '';

  status: Options[] = [
    {value: 'validado', viewValue: 'Validado'},
    {value: 'pendiente', viewValue: 'Pendiente de Validar'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  emitStatusSelected(event: any){
    
    this.selectedValue = event.value;
    this.onSelectedValue.emit(this.selectedValue)

  }

}
