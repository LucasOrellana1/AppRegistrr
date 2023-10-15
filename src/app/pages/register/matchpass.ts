import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchpass : ValidatorFn = (control: AbstractControl) : ValidationErrors | null  => {
    let password = control.get('password');
    let confirmPass = control.get('confirmPass');
    if(password && confirmPass && password?.value != confirmPass?.value){
        return {
            passMatchError: true
        }
    }
    return null
} 