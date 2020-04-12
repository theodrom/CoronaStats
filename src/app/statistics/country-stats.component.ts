import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatsService } from './stats.service';
import { IStat} from './stats-list';

@Component({
    templateUrl: './country-stats.component.html',
    styleUrls: ['./country-stats.component.scss']
})

export class CountryStatsComponent implements OnInit {
    
    constructor(private route: ActivatedRoute,
                private router: Router,
                private service: StatsService
                ) {}

    countryData?: IStat;
    error: string;

    onBack(): void{
        this.router.navigate(['/statistics'])
    }

    ngOnInit(): void {
       const countryName = this.route.snapshot.paramMap.get('country').toLowerCase();
       console.log(countryName);

        this.service.getStatsByCountryName(countryName).subscribe({
            next: countryData => this.countryData = countryData,
            error: err => this.error = err,
            complete: () => console.log(this.countryData)
        });
    }
}