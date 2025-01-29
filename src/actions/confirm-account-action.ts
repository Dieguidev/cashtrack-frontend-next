'use server'

export type ActionStateType = {
  errors: string[];

};

export async function confirmAccount(token:string, prevState: ActionStateType){
console.log(token);

  return {
    errors: [],

  }
}
