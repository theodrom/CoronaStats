export interface IStat {
get: string;
parameters: string[];
errors: string[];
results: number;
response:[{
    country: string;
    cases: { 
        new: string;
        active: number;
        critical: number;
        recovered: number;
        total: number;
     };
    deaths: { 
        new: string;
        total: number; };
    day: string;
    time: string;
}] 
}
