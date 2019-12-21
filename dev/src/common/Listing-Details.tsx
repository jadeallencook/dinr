import React from 'react';
import dateObjectToStamp from '../services/date-object-to-stamp';
import Profiles from '../assets/profiles-snapshot.json';
import acceptedPayments from '../services/accepted-payments';
import { Link } from 'react-router-dom';

interface ListingDetailsProps {
    listing: any;
    uri: string;
}

interface ListingDetailsProfileProps {
    profile: any;
}

const ListingDetailsProfile: React.FC<ListingDetailsProfileProps> = props => {
    const profile = Profiles[props.profile];
    const { name, street } = profile.personal;
    return (
        <div>
            <h3>Hosted by {name}</h3>
            <ul>
                <li><b>Address: </b>{street}</li>
                <li><b>Payments: </b>{acceptedPayments('')}</li>
            </ul>
        </div>
    );
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