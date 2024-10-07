interface IFormData {
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  options?: string[];
}
