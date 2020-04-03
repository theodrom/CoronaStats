import { Component, OnInit } from '@angular/core';
import { IStat, IResponse } from './stats-list';
import { StatsService } from './stats.service';

@Component({
    selector: 'corStats-list',
    templateUrl: './stats-list.component.html',
    styleUrls: ['./stats-list.component.scss']
})

export class CoronaStatsListComponent implements OnInit{

    corStats: IStat;
    error: string;
    filteredCorStatsResponse: IResponse[];
    date: string;

    constructor(private statsService: StatsService) {}

    _countryFilter = '';
    get countryStats(): string{
        return this._countryFilter;
    }
    set countryStats(value: string){
        this._countryFilter = value;
        this.filteredCorStatsResponse = this.countryStats ? this.filterStatsByCountry(this.countryStats) : this.corStats.response;
    }
    filterStatsByCountry(countryFilter: string): IResponse[]{
        countryFilter = countryFilter.toLocaleLowerCase();
        const responseArr = this.corStats.response;
        return responseArr.filter((responseStat: IResponse) =>
        responseStat.country.toLocaleLowerCase().includes(countryFilter)
        );
    }

    ngOnInit(): void {
        this.statsService.getAllCountryStats().subscribe({
            next: data => {
                this.corStats = data;
                this.corStats.response.sort((a, b) => {
                    return b.cases.total - a.cases.total;
                });
                this.date = this.corStats.response[0].day;
                this.filteredCorStatsResponse = this.corStats.response;
            },
            error: (err: string) => this.error = err,
            complete: () => console.table(this.corStats)
        });
    }
}
