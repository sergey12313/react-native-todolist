export interface TodoItem {
    id: string,
    text: string,
    isComplete: boolean;
} 

export type TodoItems = Array<TodoItem>

export enum Types{
    ADD_TODO,
    REMOVE_TODO,
    TOGGLE_TODO,
    EDIT_TODO,
    SET_ERROR,
    SET_LOADING,
    SET_TODOS
}
    
export type AddAction = {
    type: Types.ADD_TODO,
    payload: TodoItem
}

export type RemoveAction = {
    type: Types.REMOVE_TODO,
    payload: string
}
export type ToggleAction = {
    type: Types.TOGGLE_TODO,
    payload: {
        id: string,
        value: boolean
    }
}
export type EditAction = {
    type: Types.EDIT_TODO,
    payload: {
        id: string,
        value: string,
    }
}

export type SET_ERROR = {
    type: Types.SET_ERROR,
    payload: Error | null
}
export type SET_LOADING = {
    type: Types.SET_LOADING,
    payload: boolean
}
export type SET_TODOS = {
    type: Types.SET_TODOS,
    payload: TodoItems
}



export type  Actions = AddAction | RemoveAction | ToggleAction | EditAction | SET_ERROR | SET_LOADING | SET_TODOS


export interface TodoContextType {
    state: TodoStateType,
    dispatch:  React.Dispatch<Actions>
    getById: (id: string | null) => TodoItem | null
    addTodo: (todo: TodoItem)=> void
    removeTodo: (id: string)=> void
    editTodo: (id: string, value: string, isComplete: boolean)=> void
    toggleTodo:  (id: string, value: boolean)=> void
}
export interface ActiveItemContextType {
    active: null | string;
    setActive: (arg: string)=>void;
    clearActive: ()=>void
}

export interface TodoStateType {
    todos: TodoItems,
    isLoading: boolean,
    error: Error | null, 
}
