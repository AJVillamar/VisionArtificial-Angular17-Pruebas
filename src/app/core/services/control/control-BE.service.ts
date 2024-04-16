import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlBEService {

  private readonly _http = inject(HttpClient)
  private readonly _baseURL = environment.endpoint

  movimiento(grados: number, xMinima: number): Observable<any> {
    const body = { grados, xMinima }
    return this._http.post<any>(this._baseURL, body);
  }
  
}
