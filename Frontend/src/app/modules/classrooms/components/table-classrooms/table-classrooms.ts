import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { Classroom } from '../../interfaces/classroom';
import { TableClassroomsActions, TableClassroomsEvents } from '../../interfaces/table-classrooms';

@Component({
  selector: 'app-table-classrooms',
  imports: [Button],
  templateUrl: './table-classrooms.html',
})
export class TableClassrooms {

  @Input() classrooms: Classroom[] = [];
  @Output() onClickActions = new EventEmitter<TableClassroomsEvents>();

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

  click(id: number, action: TableClassroomsActions) {
    this.onClickActions.emit({ id, action });
  }

}
