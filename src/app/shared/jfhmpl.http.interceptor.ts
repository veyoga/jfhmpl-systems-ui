import { finalize, tap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { LoaderService } from '../services/loader.service';
import { Injectable } from '@angular/core';
@Injectable()
export class JfhmplHttpInterceptor implements HttpInterceptor {

    count = 0;

    constructor(public loadingController: LoadingController, private _loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this._loaderService.loadingPresent();

        this.count++;

        return next.handle(req)

            .pipe(finalize(() => {

                this.count--;

                if (this.count == 0) { this._loaderService.loadingDismiss(); }
            })
            );
    }
}
