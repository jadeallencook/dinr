import React from 'react';
import ListingDetails from '../common/Listing-Details';
import './Listing.scss';

interface ListingProps {
    selectedListing: any;
    setSelectedListing: any;
    currentUser: any;
}

const Listing: React.FC<ListingProps> = props => {

    let { hash } = window.location;

    if (hash && (!props.selectedListing || typeof props.selectedListing === 'string')) {
        hash = hash.replace('#/listing/', '');
        props.setSelectedListing(hash);
    }
    
    return (
        <div className="Listing">
            {
                (props.selectedListing && typeof props.selectedListing === 'string') ?
                    <h2>Loading...</h2> :
                    (props.selectedListing && typeof props.selectedListing === 'object') ?
                        <ListingDetails listing={props.selectedListing} uri={hash} currentUser={props.currentUser} /> :
                        <h2>Could not find listing...</h2>
            }
        </div>
    );
}

export default Listing;
