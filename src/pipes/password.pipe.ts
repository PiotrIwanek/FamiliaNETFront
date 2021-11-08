import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'password'})
export class PasswordPipe implements PipeTransform {
  transform(password: string) {
    return '*'.repeat(password.length);
  }
}
