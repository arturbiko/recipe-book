import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import isStringANumber from "is-string-a-number";
import {ItemService} from "../../../recipe/item/item.service";

@Component({
  selector: 'app-recipe-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  recipeForm!: FormGroup;

  maskSubmitted: boolean;

  @Input()
  recipeName!: string;

  @Output()
  formCreatedEvent = new EventEmitter();

  @Output()
  formClosedEvent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService
  ) {
    this.maskSubmitted = false;
  }

  get ingredients(): FormArray {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  get ingredientMask(): FormGroup {
    return this.recipeForm.get("ingredientMask") as FormGroup;
  }

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      name: new FormControl(this.recipeName, [
        Validators.required,
        Validators.minLength(2)
      ]),
      description: new FormControl(''),
      ingredients: this.formBuilder.array([]),
      ingredientMask: this.formBuilder.group({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2)
        ]),
        amount: new FormControl('1', [
          amountValidator(),
          Validators.min(0.1),
          Validators.max(100)
        ]),
        unit: 'pc.',
      })
    });

    this.formCreatedEvent
      .emit();
  }

  onClose(): void {
    this.recipeForm.reset();

    this.formClosedEvent
      .emit();
  }

  onSubmit(): void {
    this.itemService.addRecipe(this.recipeForm.value)
      .subscribe(data => {
        this.onClose();
      });
  }

  addIngredient() {
    this.maskSubmitted = true;

    if(this.ingredientMask.invalid) {
      return;
    }

    this.ingredients.controls.push(this.formBuilder.group({
      name: this.ingredientMask.controls.name.value,
      amount: this.ingredientMask.controls.amount.value,
      unit: this.ingredientMask.controls.unit.value
    }));

    this.ingredientMask.reset({
      name: '',
      amount: '1',
      unit: 'pc.'
    });

    this.maskSubmitted = false;
  }
}

function amountValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return isStringANumber(control.value) ? null : {amount: {value: control.value}};
  }
}
