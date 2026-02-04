import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {

   fb = inject(FormBuilder)
   hasError = signal(false)
   AuthService = inject(AuthService)
   router = inject(Router)

   registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
   })
 onSubmit(){
  if(this.registerForm.invalid){
        this.hasError.set(true);
        setTimeout(()=>{
          this.hasError.set(false);
        }, 2000);
        return;
      }
  const { name = '', email = '', password = '' } = this.registerForm.value;

    this.AuthService
      .register(name!, email!, password!)
      .subscribe(isRegistered => {
      if (isRegistered) {
        this.router.navigateByUrl('/');
        return;
      }

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
    });
}
}
