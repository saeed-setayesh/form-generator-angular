import { Component } from '@angular/core';
import { FormFields } from './form-generator/form-generator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'form-genrator';
  data= {
    name:"saeed",
    age: "2",
    ask: "test1",
    email: "iamsaeedsetayesh@gmail.com",
    gender: "female",
    terms:true
  }
  formFields = {
    name: {
      type: 'text',
      label: 'Name',
      pattern: /^[a-zA-Z]+$/,
      desciption:"please enter your name",
      access:"Limited"
    },
    email: {
      type: 'email',
      label: 'Email',
      pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      required: true,
    },
    age: {
      type: 'number',
      label: 'Age',
      required: true,
    },
    gender: {
      type: 'select',
      label: 'Gender',
      options: ['male', 'female','other',"rather not to tell"],
    },
    ask: {
      type: 'radio',
      label: 'Which One of This?',
      options: ['Coffee', 'Tea','Vodka'],
    },
    date: {
      type: 'date',
      label: 'Year',
      desciption:"please enter your name",
    },
    birthday: {
      type: 'date',
      label: 'Birthday',
    },
    range: {
      type: 'range',
      label: 'Range',
    },
    terms: {
      type: 'checkbox',
      label: 'I accept the terms and conditions',
      required: true,
    },
    what: {
      type: 'textarea',
      label: 'TextArea',
      required: true,
      pattern: /^[a-zA-Z]+$/,
      desciption:"please enter your name",
      placeholder:"this is a test"
    },

  }


  convetToJson = (input:any) =>{
    return JSON.stringify(input, null, 4)
  }

  ngOnInit(): void {
    // You Can Fetch Data here and Fill Up the Forms

    // this.data = Data From API
  }

  submit = (value:FormFields | any) =>{
    this.data = value

    // Call Your Post API Here
  }
  
}

