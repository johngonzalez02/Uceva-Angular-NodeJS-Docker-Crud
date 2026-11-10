export interface TableStudentsEvents {
    id: number;
    action: TableStudentsActions;
}

export type TableStudentsActions = 'detail' | 'edit' | 'delete';