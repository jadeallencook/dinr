import React from 'react';
import Dinners from '../assets/dinners-snapshot.json';
import ListingDetails from '../common/Listing-Details';
import './Listing.scss';

interface ListingProps {
    selectedListing: any;
    setSelectedListing: any;
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
                        <h2>Loading...</h2> : <ListingDetails listing={listing} uri={props.selectedListing} />
            }
        </div>
    );
}

export default Listing;
