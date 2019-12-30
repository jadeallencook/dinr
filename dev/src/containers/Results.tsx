import React from 'react';
import Banner from '../common/Banner';
import dinners from '../assets/dinners-snapshot.json';
import zipcodes from '../assets/zipcodes.json';
import futureDateStrings from '../services/future-date-strings';
import militaryToStandardTime from '../services/military-to-standard-time';
import { Dinner } from '../interfaces';
import { Link } from 'react-router-dom';
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
  let listings: Dinner[] = [];

  if (zipcodes[state] && zipcodes[state][city]) {
    codes = zipcodes[state][city];
  }

  if (codes.length) {
    const dates = futureDateStrings();
    codes.forEach((code: string) => {
      dates.forEach((date: string) => {
        if (dinners[code] && dinners[code][date]) {
          Object.keys(dinners[code][date]).forEach(time => {
            Object.keys(dinners[code][date][time]).forEach(uid => {
              const listing: Dinner = {
                ...dinners[code][date][time][uid],
                uri: `${code}/${date}/${time}/${uid}`
              };
              listings.push(listing);
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
          listings.map((listing: any, index: number) => {
            return (
              <Link to={`/listing/${listing.uri}`}
                key={`listing-${index}`}
                className="listing"
                onClick={() => props.setSelectedListing(listing.uri)}>
                <h3>{listing.title}</h3>
                <p className="description">{listing.description}</p>
                <p className="details">
                  <span><b>Date: </b>{`${listing.date.month}/${listing.date.day}/${listing.date.year}`}</span>
                  <span><b>Time: </b>{militaryToStandardTime(listing.time)}</span>
                  <span><b>Plates: </b>{listing.plates}</span>
                  <span><b>Price: </b>${listing.price}</span>
                </p>
              </Link>
            )
          }) :
          null
      }
    </div>
  );
}

export default Results;
