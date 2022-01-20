import {TestBed} from "@angular/core/testing";
import {AuthModule} from "./auth.module";
import {AuthService} from "./auth-service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AuthModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
    window.localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an observable with API token', () => {
    expect(window.localStorage.getItem('token')).toBeNull();
    service.authenticate({username: 'MOCK_USERNAME', password: 'MOCK_PASSWORD'}).subscribe({
      next: (apiToken) => {
        expect(apiToken).toBe('MOCK_TOKEN');
        expect(window.localStorage.getItem('token')).toBe('MOCK_TOKEN');
      }
    });
    http.expectOne('http://localhost:8000/index.php/api/login_check').flush({
      token: 'MOCK_TOKEN',
    });
  });

  it('should retrieve token from localStorage', () => {
    window.localStorage.setItem('token', 'MOCK_TOKEN');
    expect(service.getToken()).toBe('MOCK_TOKEN');
  });

  it('should remove token from localStorage', () => {
    window.localStorage.setItem('token', 'MOCK_TOKEN');
    service.logout();
    expect(window.localStorage.getItem('token')).toBeNull();
  });

  it('should retrieve true if user is authenticated', () => {
    window.localStorage.setItem('token', 'MOCK_TOKEN');
    expect(service.isAuthenticated()).toBeTrue();

    window.localStorage.removeItem('token');
    expect(service.isAuthenticated()).toBeFalse()
  });
});
