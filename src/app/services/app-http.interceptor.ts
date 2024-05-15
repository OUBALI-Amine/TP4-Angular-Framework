import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {finalize, Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AppStateService} from "./app-state.service";
import {LoadingService} from "./loading.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{
  constructor(private appState: AppStateService,
              private loadingService: LoadingService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*this.appState.setProductState({
      status:"LOADING"
    })*/
    this.loadingService.showLoadingSpinner();
    let request = req.clone({
      headers: req.headers.set("Authorization","Bearer JWT")
    });

    return next.handle(request).pipe(
      finalize(()=>{
        /*this.appState.setProductState({
          //status:"LOADED" ca cause un problem lors de l'affichage
          status: ""
        })*/
        this.loadingService.hideLoadingSpinner();
      })
    );
  }
}
