export interface TableClassroomsEvents {
    id: number;
    action: TableClassroomsActions;
}

export type TableClassroomsActions = 'detail' | 'edit' | 'delete';
