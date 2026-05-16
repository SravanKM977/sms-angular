import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Teacher } from '../../models/teachers.interface';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Subject } from '../../../subjects/models/subject.interface';

@Component({
  selector: 'app-teacher-list',
  imports: [FormsModule, AsyncPipe, CommonModule],
  templateUrl: './teacher-list.html',
  styleUrl: './teacher-list.css',
})
export class TeacherList {
  teacher = {
    id: '',
    name: '',
    email: '',
    subjectCode: '',
    experience: '',
  };

  teachersData$!: Observable<Teacher[]>;
  subjectsData$!: Observable<Subject[]>;
  mode = 'create';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teachersData$ = this.http.get<Teacher[]>('http://localhost:3000/teachers');
  }

  filterSubjectCodes() {
    this.subjectsData$ = this.http.get<Subject[]>('http://localhost:3000/subjects');
    console.log(this.subjectsData$.subscribe((data) => console.log(data)));
  }

  editTeacher(teacher: Teacher) {
    this.mode = 'update';
    this.teacher = teacher;
    this.filterSubjectCodes();
  }

  SubmitForm(teacherForm: NgForm) {
    if (!teacherForm.valid) {
      return;
    }
    if (this.mode === 'create') {
      this.http
        .get<Teacher[]>(`http://localhost:3000/teachers?email=${teacherForm.value.email}`)
        .subscribe((response) => {
          if (response.length > 0) {
            alert('Teacher email already exists!');
            return;
          } else {
            this.http.post('http://localhost:3000/teachers', teacherForm.value).subscribe(() => {
              this.loadTeachers();
              teacherForm.resetForm();
            });
          }
        });
    } else if (this.mode === 'update') {
      this.http
        .get<Teacher[]>(`http://localhost:3000/subjects?code=${teacherForm.value.subjectCode}`)
        .subscribe((response) => {
          if (response.length <= 0) {
            alert('Subject code does not exist!, please check the subject code');
            return;
          } else {
            this.http
              .put(`http://localhost:3000/teachers/${teacherForm.value.id}`, teacherForm.value)
              .subscribe(() => {
                this.loadTeachers();
                this.mode = 'create';
                this.teacher = {
                  id: '',
                  name: '',
                  email: '',
                  subjectCode: '',
                  experience: '',
                };
                teacherForm.resetForm();
              });
          }
        });
    }
  }
}
