import { Injectable } from '@angular/core';
import { IStat } from './stats-list';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class StatsService{

    constructor(private http: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': 'web1w1qieRmsh58fAr8gv78fYyU1p1xqQMcjsnMBBMaxyqmh4C'
        }),
        params: new HttpParams({})
    };
    countriesURL = 'https://covid-193.p.rapidapi.com/statistics';

    getAllCountryStats(): Observable<IStat> {
        return this.http.get<IStat>(this.countriesURL, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getStatsByCountryName(country: string): Observable<IStat> {
    //   const params = new HttpParams()
    //         .set('country', country);
      this.httpOptions.params.append('country', country);
      return this.http.get<IStat>(this.countriesURL, this.httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      }
}
