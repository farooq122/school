import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { AuthService } from '../auth.service';


@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    // constructor(private authService: AuthService) {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add base URL here to request sending to server globally at onee time
         // add authorization header with jwt token if available
        //  let currentUser = this.authService.currentUserValue;
        request = request.clone({ url: `${environment.base_url}${request.url}` });
        // if(currentUser && currentUser.token) {
        //     request = request.clone({
        //         setHeaders: { 
        //             Authorization: `${currentUser.token}`
        //         }
        //     });
        // }
        
        return next.handle(request);
    }
}