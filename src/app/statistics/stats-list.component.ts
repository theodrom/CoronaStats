import { Component, OnInit } from '@angular/core';
import { IStat, IResponse } from './stats-list';
import { StatsService } from './stats.service';

@Component({
    selector: 'corStats-list',
    templateUrl: './stats-list.component.html',
    styleUrls: ['./stats-list.component.scss']
})

export class CoronaStatsListComponent implements OnInit{

    allCoronaStats: IStat;
    error: string;
    filteredCoronaStatsResponse: IResponse[];
    date: string;
    onlyCountriesStats: IStat;
    notCountries = ['North-America', 'South-America', 'Europe', 'Africa', 'Asia', 'Oceania', 'All'];

    constructor(private statsService: StatsService) {}

    _countryFilter = '';
    get countryStats(): string{
        return this._countryFilter;
    }
    set countryStats(value: string){
        this._countryFilter = value;
        this.filteredCoronaStatsResponse = this.countryStats ? this.filterStatsByCountry(this.countryStats) : this.allCoronaStats.response;
    }
    filterStatsByCountry(countryFilter: string): IResponse[]{
        countryFilter = countryFilter.toLocaleLowerCase();
        const responseArr = this.allCoronaStats.response;
        return responseArr.filter((responseStat: IResponse) =>
        responseStat.country.toLocaleLowerCase().includes(countryFilter)
        );
    }

    filterOnlyCountryStats(allStats: IStat): IStat{
        const responseArr = this.allCoronaStats.response;
            for(let i = 0; i < this.notCountries.length; i++){
                var index = responseArr.findIndex((responeValue) => {
                    return responeValue.country === this.notCountries[i];
               })
               if (index !== -1) responseArr.splice(index, 1);
            }
        this.onlyCountriesStats = this.allCoronaStats;
        this.onlyCountriesStats.response = responseArr;
        console.log()
        return this.onlyCountriesStats;
    }

    sortStats(iStat: IStat): any{
        iStat.response.sort((a, b) => {
            return b.cases.total - a.cases.total; 
            });
    }

    ngOnInit(): void {
        this.statsService.getAllCountryStats().subscribe({
            next: data => {
                this.allCoronaStats = data;
                this.sortStats(this.allCoronaStats);
                this.date = this.allCoronaStats.response[0].day;
                this.filterOnlyCountryStats(this.allCoronaStats);
                this.filteredCoronaStatsResponse = this.onlyCountriesStats.response;
            },
            error: (err: string) => this.error = err,
            complete: () => console.table(this.allCoronaStats)
        });
    }
}
