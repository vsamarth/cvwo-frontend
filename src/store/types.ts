export type Task = { id: string; description: string; completed: boolean };

export type Tag = {id: string;description: string}

export type User = {email: string | null , name: string | null , token: string |null}

export enum Filter {
  All,
  Completed,
  Pending,
}
