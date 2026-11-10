import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { Teacher } from '../../interfaces/teacher';
import { TableTeachersActions, TableTeachersEvents } from '../../interfaces/table-teachers';

@Component({
  selector: 'app-table-teachers',
  imports: [Button],
  templateUrl: './table-teachers.html',
})
export class TableTeachers {

  @Input() teachers: Teacher[] = [];
  @Output() onClickActions = new EventEmitter<TableTeachersEvents>();

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

  click(id: number, action: TableTeachersActions) {
    this.onClickActions.emit({ id, action });
  }

}
