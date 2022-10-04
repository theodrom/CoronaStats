
export interface ICases {
    new: string;
    active: number;
    critical: number;
    recovered: number;
    '1M_pop': string;
    total: number;
}

export interface IDeaths {
    new: string;
    '1M_pop': string;
    total: number;
}

export interface ITests {
    '1M_pop': string;
    total: string;
}

export interface IResponse {
    continent: string;
    country: string;
    population: number;
    cases: ICases;
    deaths: IDeaths;
    day: string;
    time: Date;
    tests: ITests;
}

export interface IStat {
    get: string;
    parameters: any[];
    errors: any[];
    results: number;
    response: IResponse[];
}




// export interface IStat {
// get: string;
// parameters: any[];
// errors: any[];
// results: number;
// response: [{
//     country: string;
//     cases: {
//         new: string;
//         active: number;
//         critical: number;
//         recovered: number;
//         total: number;
//      };
//     deaths: {
//         new: string;
//         total: number; };
//     day: string;
//     time: string;
// }];
// }
