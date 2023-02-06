import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { validate } from 'email-validator';

interface Access {
  Limited: string;
}

export interface FormField {
  type: string;
  label: string;
  desciption: string;
  required?: boolean;
  options?: string[];
  error?: string;
  pattern?: RegExp;
  access?: Access;
  placeholder?: string;
  max?: string;
}

export interface FormFields {
  [key: string]: FormField | any;
}

@Component({
  selector: 'form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit {
  @Input() formFields: FormFields;
  @Input() preFileds: FormFields;
  @Input() getSubmit:(formGroup:FormFields)=>void;
  formGroup:any = new FormGroup({});
  submitted = false;

  ngOnInit(): void {
    Object.entries(this.formFields).forEach(([key, field]) => {
      if(field.type === 'range'){
        this.formGroup.addControl('from', new FormControl({value: this.preFileds[key], disabled: this.formFields[key].access === "Limited"}, this.getValidators(field)));
        this.formGroup.addControl('to', new FormControl({value: this.preFileds[key], disabled: this.formFields[key].access === "Limited"}, this.getValidators(field)));
      }
      this.formGroup.addControl(key, new FormControl({value: this.preFileds[key], disabled: this.formFields[key].access === "Limited"}, this.getValidators(field)));
    });
  }

  getValidators(field: FormField) {
    const validators = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.type === 'email') {
      validators.push(Validators.email);
    }
    if (field.pattern) {
      validators.push(Validators.pattern(field.pattern));
    }
    return validators;
  }

  validateField(key: string) {
    let field = this.formFields[key];
    if (!field.required) return;
    if (!this.formGroup.value[key]) {
      field.error = 'This field is required';
    }
    else if (field.type === 'date' && !(this.formGroup.value[key] instanceof Date)) {
      field.error = 'Invalid date';
    } else if (field.pattern && !field.pattern.test(this.formGroup.value[key])) {
      field.error = 'Invalid Input';
    } else {
      field.error = '';
    }
  }

  onSubmit() {
    
    this.submitted = true;
    Object.keys(this.formFields).forEach(key => this.validateField(key));
    if (Object.values(this.formFields).every(field => !field.error)) {
      console.log(this.formGroup)
    this.getSubmit(this.formGroup.value)
    }
  }
}
