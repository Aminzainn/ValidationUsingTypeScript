export interface SignUpFormState {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export interface SignInFormState {
    email: string;
    password: string;
  }
  
  export interface FormErrors {
    [key: string]: string;
  }