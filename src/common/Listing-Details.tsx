import React from 'react';
import dateObjectToStamp from '../services/date-object-to-stamp';
import militaryToStandardTime from '../services/military-to-standard-time';
import { Link } from 'react-router-dom';
import ListingDetailsProfile from './Listing-Details-Profile';
import './Listing-Details.scss';

interface ListingDetailsProps {
    listing: any;
    uri: string;
    currentUser: any;
}

const ListingDetails: React.FC<ListingDetailsProps> = props => {
    const { title, description, plates, price, time, date, profile } = props.listing;
    return (
        <div className="Listing-Details">
            <h2>${price} {title}</h2>
            <p>{description}</p>
            <ListingDetailsProfile profile={profile} />
            <span className="plates">There are {plates} plate(s) left</span>
            <Link 
                to={props.currentUser ? `/rsvp/${props.uri.replace('#/listing/', '')}` : '/account'} 
                className="btn confirm"
            >RSVP for {dateObjectToStamp(date).replace('/2020', '')} at {militaryToStandardTime(time)}</Link>
            <br />
            <Link to={`/`} className="btn">Return to results</Link>
        </div>
    );
}

export default ListingDetails;