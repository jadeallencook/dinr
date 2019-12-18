export type Time = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;
export type Rating = 1 | 2 | 3 | 4 | 5;
export type Month = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';
export type Day = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31';
export type Year = '2019' | '2020';
export type Price = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 35 | 40 | 45 | 50 | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 | 95 | 100;
export type Plates = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

export interface Dinner {
    title: string;
    description: string;
    image: string | null;
    profile: string;
    plates: Plates;
    price: Price;
    date: {
        month: Month;
        day: Day;
        year: Year;
    };
    time: Time;
    attending: string[] | null;
    uri: string | null;
};

export interface Profile {
    personal: {
        name: string;
        location: number;
        street: string | null;
        image: string | null;
    };
    payment: {
        cash: boolean;
        venmo: boolean;
        paypal: boolean;
        cashapp: boolean;
    };
    dinners: {
        host: string[] | null;
        eaten: string[] | null;
    };
    reviews: {
        left: string[] | null;
        recieved: string[] | null;
    }
};

export interface Review {
    reviewer: string;
    review: string;
    profile: string;
    rating: Rating;
};

export interface Date {
    day: Day;
    month: Month;
    year: Year;
};