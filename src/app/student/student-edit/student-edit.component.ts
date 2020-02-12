import { Component, OnInit, ViewChildren, ElementRef } from "@angular/core";
import { Student } from "../student";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "../student.service";
import { FormControl, FormControlName, FormGroup, FormBuilder, Validators} from "@angular/forms";
import { Subscription, Observable, fromEvent, merge } from "rxjs";

import { debounceTime } from "rxjs/operators";
import { GenericValidator } from "src/app/shared/generic-validator";
import { NumberValidators } from "src/app/shared/number-validator";

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  formInputElements: ElementRef[];

  pageTitle = "Edit Student";
  current: Student;
  errorMessage: string;
  studentForm: FormGroup;

  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [hey: string]: { [key: string]: string } };

  private genericValidator: GenericValidator;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {
    this.validationMessages = {
      firstname: {
        required: "Student firstname is required.",
        minlength: "Student firstname must be at least three characters.",
        maxlength: "Student firstname cannot exceed 50 characters."
      },
      lastname: {
        required: "Student lastname is required.",
        minlength: "Student lastname must be at least three characters.",
        maxlength: "Student lastname cannot exceed 50 characters."
      },
      age: {
        range:
          "The age must be at least 18 years old and not older than 122 years old"
      },
      sex: {
        required: "Sex must be M or F or NA"
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }


  ngOnInit()  {
    this.studentForm = this.fb.group({
      firstname: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      lastname: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      sex: ["", [Validators.required]],
      age: ["", NumberValidators.range(18, 122)]
    });

    const id = +this.route.snapshot.paramMap.get("id");
    this.studentService.getStudentById(id).subscribe(
      a => this.displayStudent(a),
      error => (this.errorMessage = error)
    );
  }

  
  displayStudent(student: Student): void {
    if (this.studentForm) {
      this.studentForm.reset();
    }
    this.current = student;
    this.studentForm.patchValue({
      firstname: this.current.firstname,
      lastname: this.current.lastname,
      age: this.current.age,
      sex: this.current.sex
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<
      any
    >[] = this.formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, "blur")
    );

    merge(this.studentForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(1000))
      .subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(
          this.studentForm
        );
        console.log(this.displayMessage);
      });
  }

  
  editStudent() {
    console.log(this.studentForm.value);
    let student = { ...this.studentForm.value };
    this.studentService.updateStudent(student).subscribe(
      a => {
        console.log(a);
        this.router.navigate(["/students"]);
      },
      err => (this.displayMessage.post = err)
    );
  }



}
