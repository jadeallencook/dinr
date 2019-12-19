import React from 'react';
import Dinners from '../assets/dinners-snapshot.json';
import Profiles from '../assets/profiles-snapshot.json';
import dateObjectToStamp from '../services/date-object-to-stamp';
import acceptedPayments from '../services/accepted-payments';
import { Link } from 'react-router-dom';
import './Listing.scss';

interface ListingProps {
    selectedListing: any;
    setSelectedListing: any;
}

interface SuccessProps {
    listing: any;
}

interface ProfileProps {
    profile: any;
}

const Profile: React.FC<ProfileProps> = props => {
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

const Success: React.FC<SuccessProps> = props => {
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
            <Profile profile={profile} />
            <Link to="/" className="rsvp">RSVP</Link>
        </div>
    );
}

const Listing: React.FC<ListingProps> = props => {

    if (window.location.hash) {
        let { hash } = window.location;
        hash = hash.replace('#/listing/', '');
        props.setSelectedListing(hash);
    }

    // TODO: move get listing to seperate service
    let listing = null;
    if (props.selectedListing) {
        let node: any = Dinners;
        const path = props.selectedListing.split('/');
        path.some((key: string, index: number) => {
            node = (!node[key]) ? false : node[key];
            if (path.length - 1 === index) {
                listing = node;
            } else if (!node) {
                listing = false;
            }
            return (!node);
        });
    }

    return (
        <div className="Listing">
            {
                (!listing) ?
                    (listing === false) ?
                        <h2>Could not find listing...</h2> :
                        <h2>Loading...</h2> : <Success listing={listing} />
            }
        </div>
    );
}

export default Listing;
