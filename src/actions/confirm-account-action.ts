'use server'

export type ActionStateType = {
  errors: string[];
  success: string;
};

export function confirmAccount(prevState: ActionStateType){

  return {
    errors: [],

  }
}
