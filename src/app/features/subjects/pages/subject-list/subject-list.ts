import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subject } from '../../models/subject.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-subject-list',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './subject-list.html',
  styleUrl: './subject-list.css',
})
export class SubjectList {
  subject = {
    id: '',
    code: '',
    name: '',
    description: '',
    department: '',
    grade: '',
  };

  subjectsData$!: Observable<Subject[]>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectsData$ = this.http.get<Subject[]>('http://localhost:3000/subjects');
  }

  editSubject(subject: Subject) {
    this.subject = subject;
  }

  Submit(subjectForm: NgForm) {
    if (!subjectForm.valid) {
      return;
    } else {
      this.http
        .get(`http://localhost:3000/subjects?code=${subjectForm.value.code}`)
        .subscribe((response: any) => {
          console.log(response);
          if (response?.length > 0) {
            alert('Subject code already exists!');
            return;
          } else {
            this.http
              .post('http://localhost:3000/subjects', subjectForm.value)
              .subscribe((response) => {
                console.log(response);
                this.loadSubjects();
                this.subject = {
                  id: '',
                  code: '',
                  name: '',
                  description: '',
                  department: '',
                  grade: '',
                };
                subjectForm.reset();
              });
          }
        });
    }
  }
}
