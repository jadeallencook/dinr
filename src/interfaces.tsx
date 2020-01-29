export type DayType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
export type MonthType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type YearType = 2020;
export type StateType = 'AL' | 'AK' | 'AS' | 'AZ' | 'AR' | 'CA' | 'CO' | 'CT' | 'DE' | 'DC' | 'FM' | 'FL' | 'GA' | 'GU' | 'HI' | 'ID' | 'IL' | 'IN' | 'IA' | 'KS' | 'KY' | 'LA' | 'ME' | 'MH' | 'MD' | 'MA' | 'MI' | 'MN' | 'MS' | 'MO' | 'MT' | 'NE' | 'NV' | 'NH' | 'NJ' | 'NM' | 'NY' | 'NC' | 'ND' | 'MP' | 'OH' | 'OK' | 'OR' | 'PW' | 'PA' | 'PR' | 'RI' | 'SC' | 'SD' | 'TN' | 'TX' | 'UT' | 'VT' | 'VI' | 'VA' | 'WA' | 'WV' | 'WI' | 'WY';
export type PriceType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 35 | 40 | 45 | 50 | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 | 95 | 100;
export type PlatesType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type TimeType = 0 | 30 | 100 | 130 | 200 | 230 | 300 | 330 | 400 | 430 | 500 | 530 | 600 | 630 | 700 | 730 | 800 | 830 | 900 | 930 | 1000 | 1030 | 1100 | 1130 | 1200 | 1230 | 1300 | 1330 | 1400 | 1430 | 1500 | 1530 | 1600 | 1630 | 1700 | 1730 | 1800 | 1830 | 1900 | 1930 | 2000 | 2030 | 2100 | 2130 | 2200 | 2230 | 2300 | 2330;
export type RatingType = 1 | 2 | 3 | 4 | 5;

export interface DateInterface {
    day: DayType
    month: MonthType
    year: YearType;
};

export interface PaymentInterface {
    cash: boolean;
    venmo: boolean;
    paypal: boolean;
    cashapp: boolean;
};

export interface ReviewInterface {
    reviewer: string;
    review: string;
    profile: string;
    rating: Rating;
};

export interface DinnerInterface {
    title: string;
    description: string;
    image: string | null;
    profile: string;
    plates: PlatesType;
    price: PriceType;
    date: DateInterface;
    time: TimeType;
    attending: string[] | null;
    uri?: string | null;
};

export interface ProfileInterface {
    uri?: string | null;
    personal?: {
        name?: string;
        zipcode?: number;
        street?: string | null;
        image?: string | null;
    };
    payments?: PaymentInterface;
    dinners?: {
        host: string[] | null;
        eaten: string[] | null;
    };
    reviews?: {
        left: string[] | null;
        recieved: string[] | null;
    }
};