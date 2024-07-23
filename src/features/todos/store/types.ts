export interface ITodo {
    id: number,
    task: string,
    isEditing: boolean,
    timer: number,
    timerRunning: boolean,
    timerChanging: boolean,
    newTimer: string
}