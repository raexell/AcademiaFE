import { Component, OnInit, ViewChildren, ElementRef } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription, from, fromEvent, Observable, merge } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { AgentService } from "../agent.service";
import { GenericValidator } from "src/app/shared/generic-validator";
import { NumberValidators } from "src/app/shared/number-validator";

@Component({
  selector: "app-agent-add",
  templateUrl: "./agent-add.component.html",
  styleUrls: ["./agent-add.component.css"]
})
export class AgentAddComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  pageTitle = "Add Agent";
  errorMessage: string;
  agentForm: FormGroup;

  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService
  ) {
    this.validationMessages = {
      firstname: {
        required: "Agent firstname is required.",
        minlength: "Agent firstname must be at least three characters.",
        maxlength: "Agent firstname cannot exceed 50 characters."
      },
      lastname: {
        required: "Agent lastname is required.",
        minlength: "Agent lastname must be at least three characters.",
        maxlength: "Agent lastname cannot exceed 50 characters."
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

  ngOnInit(): void {
    this.agentForm = this.fb.group({
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
  }

  saveAgent(): void {
    console.log(this.agentForm.value);
    let agent = { ...this.agentForm.value };
    this.agentService.createAgent(agent).subscribe(
      a => {
        console.log(a);
        this.router.navigate(["/agents"]);
      },
      err => (this.displayMessage.post = err)
    );
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<
      any
    >[] = this.formInputElements.map((formControl: ElementRef) =>
      fromEvent(formControl.nativeElement, "blur")
    );

    merge(this.agentForm.valueChanges, ...controlBlurs)
      .pipe(debounceTime(2000))
      .subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(
          this.agentForm
        );
        console.log(this.displayMessage);
      });
  }
}
