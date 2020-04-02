import { Component, OnInit } from '@angular/core';
import { IStat } from './stats-list';
import { StatsService } from './stats.service'

@Component({
    selector: 'corStats-list',
    templateUrl: './stats-list.component.html',
    styleUrls: ['./stats-list.component.scss']
})

export class CoronaStatsListComponent implements OnInit{

    corStats: IStat[];
    error: string;

    constructor(private statsService: StatsService) {}

    ngOnInit(): void {
        this.statsService.getAllCountryStats().subscribe({
            next: data => this.corStats = data,
            error: (err: string) => this.error = err,
            complete: () => console.log('Coplited')
        });
    }
}