import { AbstractControl } from '@angular/forms';

export function ValidateJSON(control: AbstractControl) {
    const jsonString: string = control.value;
    try {
        JSON.parse(jsonString);
    } catch (e) {
        return { 'invalidJSON': true };
    }
    return null;
}
