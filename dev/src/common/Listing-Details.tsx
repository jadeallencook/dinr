import React from 'react';
import dateObjectToStamp from '../services/date-object-to-stamp';
import { Link } from 'react-router-dom';
import ListingDetailsProfile from './Listing-Details-Profile';

interface ListingDetailsProps {
    listing: any;
    uri: string;
}

const ListingDetails: React.FC<ListingDetailsProps> = props => {
    const { title, description, plates, price, time, date, profile } = props.listing;
    return (
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
            <ul>
                <li><b>Date: </b>{dateObjectToStamp(date)}</li>
                <li><b>Time: </b>{time}</li>
                <li><b>Plates: </b>{plates}</li>
                <li><b>Price: </b>${price}</li>
            </ul>
            <ListingDetailsProfile profile={profile} />
            <Link to={`/rsvp/${props.uri}`} className="rsvp">RSVP</Link>
        </div>
    );
}

export default ListingDetails;