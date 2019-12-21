import React from 'react';
import Profiles from '../assets/profiles-snapshot.json';
import acceptedPayments from '../services/accepted-payments';

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

export default ListingDetailsProfile;