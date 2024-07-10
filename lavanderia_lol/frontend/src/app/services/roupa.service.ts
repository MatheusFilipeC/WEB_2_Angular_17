import { Injectable } from '@angular/core';
import { Roupa } from '../shared/models/roupa.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoupaService {
  BASE_URL = "http://localhost:8080/roupas";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Roupa[] | null> {
    return this.httpClient.get<Roupa[]>(
      this.BASE_URL,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Roupa[]>) => {
          if (resp.status === 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  inserir(roupa: Roupa): Observable<Roupa | null> {
    return this.httpClient.post<Roupa>(this.BASE_URL, JSON.stringify(roupa),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Roupa>) => {
          if(resp.status == 201) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }

  buscarPorId(id: number): Observable<Roupa | null>  {
    return this.httpClient.get<Roupa>(
      this.BASE_URL + "/" + id,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Roupa>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of (null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  atualizar(roupa: Roupa): Observable<Roupa | null> {
    return this.httpClient.put<Roupa>(this.BASE_URL + "/" + roupa.id,
      JSON.stringify(roupa),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Roupa>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }

  remover(id: number): Observable<Roupa | null> {
    return this.httpClient.delete<Roupa>(this.BASE_URL + "/" + id,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Roupa>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      );
  }
}
