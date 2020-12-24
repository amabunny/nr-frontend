declare module '@dps-models' {
  export interface IPost {
    time?: string
    text?: string
    author?: string
    replies?: IPost[]
  }
}
