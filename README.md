# Dinr

Dates are stored like such:

```ssh
01/01/2020 = 1012020
12/31/2020 = 12312020
```

Times are stored like such:

```ssh
9:00AM = 900
1:00PM = 1300
```

## Dinners

When a new dinner is created: 

1. User is required to add street address to profile. 
1. Title, description, date, time, servings, price, and profile are required. 
1. New node is created at "locations.**zipcode.date.time.dinner-uid**".
1. Dinner's UID is added to "**profile-uid**.dinners.host".

When someone RSVPs a dinner: 

1. User's UID is added to the attending array.
1. dinners's UID is added to the user's "dinners.eaten" array.

When someone cancels a dinner: 

1. User's UID is removed from the dinner's attending array.
1. Dinners's UID is removed from the user's "dinners.eaten" array.

```ts
{
    "title": string;
    "description": string
    "image": string | null,
    "profile": string,
    "servings": number,
    "price": number,
    "date": number,
    "time": number,
    "attending": string[] | null
}
```

## Profiles

When a new profile is created:

1. Name, location, and one form of payment is required. 

```ts
{
    "personal": {
        "name": string,
        "location": number,
        "street": string | null,
        "image": string | null
    },
    "payment": {
        "cash": boolean,
        "venmo": boolean,
        "paypal": boolean,
        "cashapp": boolean
    },
    "dinners": {
        "host": string[] | null,
        "eaten": string[] | null
    },
    "reviews": {
        "left": string[] | null,
        "recieved": string[] | null,
    }
}
```

## Reviews

When a new review is created:

1. Push review to the "reviews" node.
1. Add the review's UID to the user's profile at "user.reviews.left".
1. Add the review's UID to the cook's profile at "user.reviews.recieved".

```ts
{
    "reviewer": string,
    "review": string,
    "profile": string,
    "rating": number
}
```