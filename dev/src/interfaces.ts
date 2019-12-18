type Time = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23;
type Rating = 1|2|3|4|5;
type Month = '1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12';
type Day = '01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31';
type Year = '2019'|'2020';
type Price = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|35|40|45|50|55|60|65|70|75|80|85|90|95|100;
type Plates = 1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20;

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