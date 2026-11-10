export interface TableTeachersEvents {
    id: number;
    action: TableTeachersActions;
}

export type TableTeachersActions = 'detail' | 'edit' | 'delete';
