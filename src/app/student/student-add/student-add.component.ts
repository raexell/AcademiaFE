import { StudentService } from './../student.service';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, from, fromEvent, Observable, merge } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { GenericValidator } from "src/app/shared/generic-validator";
import { NumberValidators } from "src/app/shared/number-validator";
@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {
  pageTitle = "Add Student";
  
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

 
  errorMessage: string;
  studentForm: FormGroup;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
 


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
    )  {
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
    
        sex: {
          required: "Sex must be M or F or NA"
        },
        email: {
          required: "You must insert a vaild email."
        },
        phone: {
          required: "You must insert a telephone number.",
          minlength: "Phone number must contains at least 10 numbers.",
          maxlength: "Phone number cannot contain more than 14 characters."
          
        },
        degreeTitle: {
          required: "You must insert a Degree Title.",
        },
        
  
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
        email: ["", Validators.required],
        phone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(14)] ],
        degreeTitle: ["", Validators.maxLength(100)],
        independent:[""],
        degreeType:[""],
        dateOfBirth:[""],
        idClient:[""],
        
        
      });
  
     
    }

  saveStudent(): void {
    console.log(this.studentForm.value);
    let student = { ...this.studentForm.value };
    this.studentService.createStudent(student).subscribe(
      a => {
        console.log(a);
        this.router.navigate(["/students"]);
      },
      err => (this.displayMessage.post = err)
    );
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
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
  addStudent(): void {
    console.log("entrati in addStudent")
    console.log(this.studentForm.value);
 
    let student = { ...this.studentForm.value };
  
    this.studentService.createStudent(student).subscribe(
      a => {
        console.log(a);
        console.log(a.id);
        this.router.navigate(["/students"]);
      },
      err => (this.displayMessage.post = err)
    );
  }

}
