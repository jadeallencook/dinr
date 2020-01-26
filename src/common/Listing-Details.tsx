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
            <h2>{title}</h2>
            <p>{description}</p>
            <ul>
                <li><b>Date: </b>{dateObjectToStamp(date)}</li>
                <li><b>Time: </b>{militaryToStandardTime(time)}</li>
                <li><b>Plates: </b>{plates}</li>
                <li><b>Price: </b>${price}</li>
            </ul>
            <ListingDetailsProfile profile={profile} />
            <Link 
                to={props.currentUser ? `/rsvp/${props.uri.replace('#/listing/', '')}` : '/account'} 
                className="btn confirm"
            >RSVP</Link>
            <br />
            <Link to={`/`} className="btn">Return to results</Link>
        </div>
    );
}

export default ListingDetails;