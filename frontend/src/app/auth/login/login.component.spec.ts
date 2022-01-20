import {ComponentFixture, TestBed} from "@angular/core/testing";
import {AuthModule} from "../auth.module";
import {LoginComponent} from "./login.component";
import {Router, RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../auth-service";
import {of, throwError} from "rxjs";

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let document: HTMLElement;
  let usernameInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AuthModule, RouterModule.forRoot([]), ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(LoginComponent);
    document = fixture.nativeElement;

    usernameInput = document.querySelector('input[name=username]');
    passwordInput = document.querySelector('input[name=password]');

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display a form with 2 input', () => {
    expect(document.querySelector('form')).toBeTruthy();
    expect(document.querySelector('button')).toBeTruthy();
    expect(usernameInput).toBeTruthy();
    expect(usernameInput.getAttribute('type')).toBe('email');
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.getAttribute('type')).toBe('password');
  });

  it('should redirect if credentials are ok', () => {
    const authSpy = spyOn(authService, 'authenticate').and.returnValue(of("MOCK_TOKEN"));
    const routerSpy = spyOn(router, 'navigateByUrl');

    usernameInput.value = 'test@mail.com';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'p4ssword';
    passwordInput.dispatchEvent(new Event('input'));

    document.querySelector('button').click();

    expect(authSpy).toHaveBeenCalledWith({
      username: 'test@mail.com',
      password: 'p4ssword'
    });
    expect(routerSpy).toHaveBeenCalledWith('/customers');
  });

  it('should not redirect if credentials are wrong and should display error message', () => {
    const authSpy = spyOn(authService, 'authenticate').and.returnValue(throwError('Bad Credentials'));
    const routerSpy = spyOn(router, 'navigateByUrl');

    expect(document.querySelector('.alert-danger')).not.toBeTruthy();

    usernameInput.value = 'test@mail.com';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.value = 'p4ssword';
    passwordInput.dispatchEvent(new Event('input'));

    document.querySelector('button').click();

    fixture.detectChanges();

    expect(authSpy).toHaveBeenCalledWith({
      username: 'test@mail.com',
      password: 'p4ssword'
    });
    expect(routerSpy).not.toHaveBeenCalled();
    expect(document.querySelector('.alert-danger').textContent.trim()).toBe('Connexion impossible, merci de réessayer.');
  });
})
