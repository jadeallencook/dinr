import React, { useState } from 'react';
import getListingFromHash from '../services/get-listing-from-hash';
import dateObjectToStamp from '../services/date-object-to-stamp';
import miltaryToStandardTime from '../services/military-to-standard-time';
import { Link } from 'react-router-dom';
import './RSVP.scss';

interface RSVPProps {
    selectedListing: any;
    setSelectedListing: any;
}

const RSVP: React.FC<RSVPProps> = props => {

    if (!props.selectedListing) {
        props.setSelectedListing(window.location.hash.replace('#/rsvp/', ''));
    }

    const [confirmed, setConfirmed] = useState(false);
    const listing = getListingFromHash(props.selectedListing);

    const confirm = () => {
        setConfirmed(true);
    }

    const cancel = () => {
        setConfirmed(false);
    }

    if (listing) {
        const { title, time, date } = listing;
        if (confirmed) {
            return (
                <div className="RSVP">
                    <h2>You're Confirmed!</h2>
                    <p>
                        You've successfully RSVP'd your seat for "{title}" on {dateObjectToStamp(date)} at {miltaryToStandardTime(time)}.
                        It will cost $7 for your meal and it is located at 123 Main Street.
                        A reminder of this dinner has been added to your homepage!
                </p>
                    <button onClick={cancel} className="btn discard">Cancel RSVP</button>
                    <br />
                    <Link to={`/`} className="btn">Return to results</Link>
                </div>
            );
        } else {
            return (
                <div className="RSVP">
                    <h2>Please Confirm</h2>
                    <p>
                        You will be attending "{title}" on {dateObjectToStamp(date)} at {miltaryToStandardTime(time)}.
                        It will cost $7 for your meal and it is located at 123 Main Street.
                </p>
                    <button onClick={confirm} className="btn confirm">Yes, I'll be there!</button>
                    <br />
                    <Link to={`/listing/${props.selectedListing}`} className="btn">No, I'd like to cancel.</Link>
                </div>
            );
        }
    } else {
        return (
            <div className="RSVP">
                <h2>Could not find listing...</h2>
            </div>
        );
    }
}

export default RSVP;
