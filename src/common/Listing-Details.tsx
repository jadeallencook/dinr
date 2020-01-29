import React from 'react';
import dateObjectToStamp from '../services/date-object-to-stamp';
import militaryToStandardTime from '../services/military-to-standard-time';
import { Link } from 'react-router-dom';
import ListingDetailsProfile from './Listing-Details-Profile';
import './Listing-Details.scss';
import * as firebase from 'firebase/app';
import 'firebase/database';

interface ListingDetailsProps {
    listing: any;
    uri: string;
    currentUser: any;
    selectedListingHost: any;
}

const ListingDetails: React.FC<ListingDetailsProps> = props => {
    const { title, description, plates, price, time, date, profile } = props.listing;
    return profile ? (
        <div className="Listing-Details">
            <h2>${price} {title}</h2>
            <p>{description}</p>
            {props.selectedListingHost ? <ListingDetailsProfile profile={props.selectedListingHost} /> : null}
            <span className="plates">There are {plates} plate(s) left</span>
            {
                (profile && props.currentUser && profile !== props.currentUser.uid) ?
                    <Link
                        to={props.currentUser ? `/rsvp/${props.uri.replace('#/listing/', '')}` : '/account'}
                        className="btn confirm"
                    >RSVP for {dateObjectToStamp(date).replace('/2020', '')} at {militaryToStandardTime(time)}</Link> : null
            }
            {
                (profile && props.currentUser && profile === props.currentUser.uid) ?
                    <div onClick={() => {
                        const url = props.uri.replace('#/listing/', '');
                        firebase
                            .database()
                            .ref(`dinners/${url}`)
                            .remove()
                            .then(() => {
                                window.location.hash = '/';
                            });
                        console.log(props.uri.replace('#/listing/', ''));
                    }} className="btn discard">Remove Dinner</div> : null
            }
            <br />
            <Link to={`/`} className="btn">Return to results</Link>
        </div>
    ) : (
            <div>
                <h2>Something went wrong.</h2>
                <p>Dinner not found!</p>
            </div>
        );
}

export default ListingDetails;