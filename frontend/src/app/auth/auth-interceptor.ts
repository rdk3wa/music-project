import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth-service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.service.getToken();

    if (!token) {
      return next.handle(req);
    }

    const updatedReq = req.clone({
      setHeaders: {
        Authorization: 'bearer ' + token,
      }
    })
    return next.handle(updatedReq);
  }

}
