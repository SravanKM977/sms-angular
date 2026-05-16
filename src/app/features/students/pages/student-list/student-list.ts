import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { number } from 'motion';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-student-list',
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {
  student = {
    id: '',
    name: '',
    email: '',
    dateOfBirth: new Date(),
    age: '',
    grade: '',
  };

  mode = 'create';
  studentData$!: Observable<Student[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentData$ = this.http.get<Student[]>('http://localhost:3000/students');
  }

  EditStudent(student: Student) {
    this.mode = 'update';
    this.student = student;
    console.log(student);
  }

  SubmitForm(studentForm: NgForm) {
    console.log(studentForm?.valid);
    if (!studentForm.valid) {
      console.log('Form is invalid');
      return;
    } else {
      if (this.mode === 'create') {
        this.http
          .get<Student[]>(`http://localhost:3000/students?email=${studentForm.value.email}`)
          .subscribe((response) => {
            if (response.length > 0) {
              alert('Student email already exists!');
              return;
            } else {
              this.http.post('http://localhost:3000/students', studentForm.value).subscribe(() => {
                this.loadStudents();
                studentForm.resetForm();
              });
            }
          });
      } else if (this.mode === 'update') {
        console.log(this.mode);
        this.http
          .get<Student[]>(`http://localhost:3000/students?email=${studentForm.value.email}`)
          .subscribe((response) => {
            console.log(response);
            console.log(studentForm.value.id);
            console.log(response[0].id);
            if (response.length <= 0) {
              if (studentForm.value.id === this.student.id) {
                this.http
                  .put(`http://localhost:3000/students/${studentForm.value.id}`, studentForm.value)
                  .subscribe(() => {
                    this.loadStudents();
                    this.mode = 'create';
                    this.student = {
                      id: '',
                      name: '',
                      email: '',
                      dateOfBirth: new Date(),
                      age: '',
                      grade: '',
                    };
                    studentForm.resetForm();
                  });
                return;
              } else {
                alert('Student email already exists!');
                return;
              }
            }
          });
      }
    }
  }
}
