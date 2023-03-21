export interface INews {
    id: number,
    deleted?: boolean,
    type: string,
    time: number,
    text?: string,
    by: string,
    dead?: boolean,
    parent?: number,
    pol?: number,
    kids?: Array<number>,
    url: string,
    score: number,
    title: string,
    parts?: number[], 
    descendants: number
}
