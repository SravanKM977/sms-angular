import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-class-list',
  imports: [FormsModule],
  templateUrl: './class-list.html',
  styleUrl: './class-list.css',
})
export class ClassList {
  class = {
    id: '',
    name: '',
    teacher: '',
  };

  constructor(private http: HttpClient) {}

  Submit(classForm: NgForm) {
    console.log(classForm.valid);
    console.log(classForm.value);

    if (classForm.invalid) {
      return;
    } else {
      this.http.post('http://localhost:3000/class', classForm.value).subscribe();
    }
  }
}
