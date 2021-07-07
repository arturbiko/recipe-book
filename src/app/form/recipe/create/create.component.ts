import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
import {Ingredient} from "../../../recipe/item/ingredient.model";

@Component({
  selector: 'app-recipe-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  recipeForm!: FormGroup;

  ingredient: Object;

  @Input()
  recipeName!: string;

  @Output()
  formCreatedEvent = new EventEmitter();

  @Output()
  formClosedEvent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.ingredient = {
      name: '',
      amount: '1',
      unit: 'pc.'
    }
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
      ingredients: this.formBuilder.array([]),
      ingredientMask: this.formBuilder.group({
        name: new FormControl('', [
          Validators.required
        ]),
        amount: new FormControl('1', [
          amountValidator()
        ]),
        unit: 'pc.',
      })
    });

    this.formCreatedEvent
      .emit();
  }

  onAbort(): void {
    this.recipeForm.reset();

    this.formClosedEvent
      .emit();
  }

  onSubmit(): void {

  }

  addIngredient() {
    this.ingredients.push(this.formBuilder.group({
      name: this.ingredientMask.controls.name,
      amount: this.ingredientMask.controls.amount,
      unit: this.ingredientMask.controls.unit
    }));

    this.ingredientMask.reset({
      name: '',
      amount: '1',
      unit: 'pc.'
    });
  }
}

function amountValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return isStringANumber(control.value) ? null : {amount: {value: control.value}};
  }
}
