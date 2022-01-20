import {AuthGuard} from "./auth-guard";
import {AuthService} from "./auth-service";
import {ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot} from "@angular/router";
import {TestBed} from "@angular/core/testing";
import {AuthModule} from "./auth.module";

describe('AuthGuard', () => {
  let authService: AuthService;
  let authGuard: AuthGuard;
  let router: Router;
  let spyRouter: jasmine.Spy;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AuthModule, RouterModule.forRoot([])]
    });

    authService = TestBed.inject(AuthService);
    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    spyRouter = spyOn(router, 'navigateByUrl');
  });

  it('should return true if token is found',  () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    const result = authGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(result).toBeTrue();
    expect(spyRouter).not.toHaveBeenCalled();
  });

  it('should redirect to /login if token is not found', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);

    authGuard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(spyRouter).toHaveBeenCalledWith('/');
  });
});
