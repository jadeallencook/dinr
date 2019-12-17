import React from 'react';
import Banner from '../common/Banner';
import dinners from '../assets/dinners-snapshot.json';
import zipcodes from '../assets/zipcodes.json';
import './Results.scss';

interface ResultsProps {
  searchState: string;
  searchCity: string;
  selectedListing: any;
  setSelectedListing: any;
}

const Results: React.FC<ResultsProps> = props => {

  const city: string = props.searchCity.toLocaleLowerCase();
  const state: string = props.searchState;
  let codes = [];
  let listings: any = [];

  if (zipcodes[state] && zipcodes[state][city]) {
    codes = zipcodes[state][city];
  }

  if (codes.length) {
    // TODO: move this logic to a service file
    const date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let dates: string[] = [];
    for (let num = 0; num < 30; num++) {
      let dayString = (day.toString().length === 1) ? `0${day}` : day;
      let string = `${month}${dayString}${year}`;
      dates.push(string);
      day++;
      if (day > 31) {
        day = 1;
        month++;
        month = month > 12 ? 1 : month;
        year = month === 1 ? year + 1 : year;
      }
    }
    // iterate over zipcodes and dates to get results
    codes.forEach((code: string) => {
      dates.forEach((date: string) => {
        if (dinners[code] && dinners[code][date]) {
          Object.keys(dinners[code][date]).forEach(time => {
            Object.keys(dinners[code][date][time]).forEach(uid => {
              const dinner = {
                ...dinners[code][date][time][uid],
                uid: uid,
                zipcode: code,
                uri: `${code}/${date}/${time}/${uid}`
              }
              listings.push(dinner);
            });
          });
        }
      });
    });
  }

  return (
    <div className="Results">
      <Banner />
      {
        !listings.length ?
          <h2>There are no listings for this area, sorry!</h2> :
          <h2>Upcoming Dinners</h2>
      }
      {
        // TODO: create seperate component for listing
        listings.length ?
          listings.map((listing: any) => {
            return (
              <div key={listing.uid}
                className="listing"
                onClick={() => props.setSelectedListing(listing.uri)}>
                <h3>{listing.title}</h3>
                <p className="description">{listing.description}</p>
                <p className="details">
                  <span><b>Date: </b>{`${listing.date.month}/${listing.date.day}/${listing.date.year}`}</span>
                  <span><b>Time: </b>{listing.time}:00</span>
                  <span><b>Plates: </b>{listing.plates}</span>
                  <span><b>Price: </b>${listing.price}</span>
                </p>
              </div>
            )
          }) :
          null
      }
    </div>
  );
}

export default Results;
