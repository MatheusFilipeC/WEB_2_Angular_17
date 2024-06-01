import { Injectable } from '@angular/core';
import { Pedido } from '../shared';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  BASE_URL = "http://localhost:8080/pedidos";

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private loginService: LoginService,
    private httpClient: HttpClient) { }

  usuarioLogado = this.loginService.usuarioLogado;

  listarTodos(): Observable<Pedido[] | null> {
    return this.httpClient.get<Pedido[]>(
      this.BASE_URL,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Pedido[]>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return [];
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of([]);
          } else {
            return throwError(() => err)
          }
        })
      );
  }

  inserir(pedido: Pedido): Observable<Pedido | null> {
    return this.httpClient.post<Pedido>(this.BASE_URL,
      JSON.stringify(pedido),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Pedido>) => {
          if (resp.status == 201) {
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

  buscarPorId(id: number): Observable<Pedido | null> {
    return this.httpClient.get<Pedido>(
      this.BASE_URL + "/" + id,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Pedido>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status == 404) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  atualizar(pedido: Pedido): Observable<Pedido | null> {
    return this.httpClient.put<Pedido>(this.BASE_URL + "/" + pedido.id,
      JSON.stringify(pedido),
      this.httpOptions).pipe(
        map((resp: HttpResponse<Pedido>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError ((err, caught) => {
          return throwError(() => err);
        })
      );
  }

  remover(id: number): Observable<Pedido | null> {
    return this.httpClient.delete<Pedido>(this.BASE_URL + "/" + id,
      this.httpOptions).pipe(
        map((resp: HttpResponse<Pedido>) => {
          if (resp.status == 200) {
            return resp.body;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          return throwError(() => err);
        })
      )
  }

}