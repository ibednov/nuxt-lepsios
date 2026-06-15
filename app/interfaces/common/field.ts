export interface FieldOption {
  label: string
  value: string | number
  icon?: string
}

export interface FieldInterface {
  key?: string
  type: 'input' | 'textarea' | 'textarea-md' | 'date' | 'date-year-and-months' | 'select' | 'text' | 'tags' | 'switch' | 'price' | 'link' | 'file' | 'phone' | 'otp' | 'group' | 'repeater'
  placeholder?: string
  label?: string
  valueType?: 'text' | 'number'
  inputType?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search'
  options?: FieldOption[]
  required?: boolean
  minLength?: number
  maxLength?: number
  length?: number
  class?: string
  fields?: FieldInterface[]
  fieldsContainerClass?: string
  addButtonText?: string
  removeButtonText?: string
  accept?: string
  maxSize?: number
}

export interface FieldDataInterface extends FieldInterface {
  value?: any
  currency?: string | null
  fields?: FieldDataInterface[]
  file?: File | null
  fieldName?: string
  error?: string | null
}
