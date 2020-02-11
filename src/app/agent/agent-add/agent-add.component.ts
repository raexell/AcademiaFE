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
import { GenericValidator } from "../generic-validator";
import { NumberValidators } from "../number-validator";
import { AgentService } from "../agent.service";

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
      name: {
        required: "Agent name is required.",
        minlength: "Agent name must be at least three characters.",
        maxlength: "Agent name cannot exceed 50 characters."
      },
      age: {
        range:
          "The age must be at least 18 years old and not older than 122 years old"
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.agentForm = this.fb.group({
      name: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
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
