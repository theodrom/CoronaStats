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
    countryResp: IResponse[];
    error: string;

    constructor(private statsService: StatsService) {}

    _countryFilter = '';
    get countryStats(): string{
        return this._countryFilter;
    }
    set countryStats(value: string){
        this._countryFilter = value;
        this.corStats.response = this.countryStats ? this.filterStatsByCountry(this.countryStats) : this.corStats.response;
    }
    filterStatsByCountry(countryFilter: string): IResponse[]{
        countryFilter = countryFilter.toLocaleLowerCase();
        return this.corStats.response.filter((responseStat: IResponse) =>
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
            },
            error: (err: string) => this.error = err,
            complete: () => console.table(this.corStats)
        });
    }
}
