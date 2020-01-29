import React from 'react';
import acceptedPayments from '../services/accepted-payments';
import './Listing-Details-Profile.scss';

interface ListingDetailsProfileProps {
    profile: any;
}

const ListingDetailsProfile: React.FC<ListingDetailsProfileProps> = props => {
    return props.profile ? (
        <div className="Listing-Details-Profile">
            <h3>Hosted by {props?.profile?.personal?.name || 'loading...'}</h3>
            <ul>
                <li><b>Address: {props?.profile?.personal?.street}</b>{}</li>
                <li><b>Payments: </b>{acceptedPayments(props?.profile?.payments)}</li>
            </ul>
        </div>
    ) : null;
}

export default ListingDetailsProfile;