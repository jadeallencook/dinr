import React from 'react';
import { Link } from 'react-router-dom';
import './Listing.scss';

interface RSVPProps {
    selectedListing: any;
    setSelectedListing: any;
}

const RSVP: React.FC<RSVPProps> = props => {
    return(<h1>RSVP</h1>);
}

export default RSVP;
