import React from 'react';
import Banner from '../common/Banner';
import militaryToStandardTime from '../services/military-to-standard-time';
import { Link } from 'react-router-dom';
import './Results.scss';
import 'firebase/database';

interface ResultsProps {
  searchState: string;
  searchCity: string;
  selectedListing: any;
  setSelectedListing: any;
  searchResults: any;
}

const Results: React.FC<ResultsProps> = props => {
  return (
    <div className="Results">
      <Banner />
      {
        !props.searchResults.length ?
          <h2>There are no listings for this area, sorry!</h2> :
          <h2>Upcoming Dinners</h2>
      }
      {
        // TODO: create seperate component for listing
        props.searchResults.length ?
          props.searchResults.map((listing: any, index: number) => {
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
