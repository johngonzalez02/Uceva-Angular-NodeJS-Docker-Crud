import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { Student } from '../../interfaces/student';
import { TableStudentsActions, TableStudentsEvents } from '../../interfaces/table-students';

@Component({
  selector: 'app-table-students',
  imports: [Button],
  templateUrl: './table-students.html',
})
export class TableStudents {

  @Input() students: Student[] = [];
  @Output() onClickActions = new EventEmitter<TableStudentsEvents>();

  configDetailButton: ButtonConfig = {
    id: 'detail',
    type: 'primary',
    icon: 'eye',
    outline: true,
    size: 'sm'
  }

  configEditButton: ButtonConfig = {
    id: 'update',
    type: 'warning',
    icon: 'pencil-square',
    outline: true,
    size: 'sm'
  }

  configDeleteButton: ButtonConfig = {
    id: 'delete',
    type: 'danger',
    icon: 'trash',
    outline: true,
    size: 'sm'
  }

  click(id: number, action: TableStudentsActions){
    this.onClickActions.emit({id, action});
  }

}
