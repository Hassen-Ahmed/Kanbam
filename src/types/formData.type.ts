export interface IFormData {
  id: string;
  errormessage: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  label: string;
  value?: string;
  name: "email" | "password" | "passwordConfirm";
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
