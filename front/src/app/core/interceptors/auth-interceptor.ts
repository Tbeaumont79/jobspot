import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/ld+json',
      },
      withCredentials: true,
    });
    return next.handle(authReq);
  }
}
