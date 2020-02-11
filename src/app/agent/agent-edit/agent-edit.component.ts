import { Component, OnInit, ViewChildren, ElementRef } from "@angular/core";
import { Agent } from "../agent";
import { ActivatedRoute, Router } from "@angular/router";
import { AgentService } from "../agent.service";
import {
  FormControl,
  FormControlName,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { GenericValidator } from "../generic-validator";
import { Subscription, Observable, fromEvent, merge } from "rxjs";
import { NumberValidators } from "../number-validator";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-agent-edit",
  templateUrl: "./agent-edit.component.html",
  styleUrls: ["./agent-edit.component.css"]
})
export class AgentEditComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];

  pageTitle = "Edit Agent";
  current: Agent;
  errorMessage: string;
  agentForm: FormGroup;

  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [hey: string]: { [key: string]: string } };

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

  ngOnInit() {
    this.agentForm = this.fb.group({
      name: [
        "",
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      age: ["", NumberValidators.range(18, 122)]
    });

    const id = +this.route.snapshot.paramMap.get("id");
    this.agentService.getAgentById(id).subscribe(
      a => this.displayAgent(a),
      error => (this.errorMessage = error)
    );
  }

  displayAgent(agent: Agent): void {
    if (this.agentForm) {
      this.agentForm.reset();
    }
    this.current = agent;
    this.agentForm.patchValue({
      name: this.current.name,
      age: this.current.age
    });
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

  editAgent() {
    console.log(this.agentForm.value);
    let agent = { ...this.agentForm.value };
    this.agentService.updateAgent(agent).subscribe(
      a => {
        console.log(a);
        this.router.navigate(["/agents"]);
      },
      err => (this.displayMessage.post = err)
    );
  }
}
