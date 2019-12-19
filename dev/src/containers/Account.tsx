import React from 'react';
import { Link } from 'react-router-dom';
import './Account.scss';

interface AccountProps {
    currentUser: any;
    setCurrentUser: any;
}

const Account: React.FC<AccountProps> = props => {
    return (<h1>Account Page</h1>)
}

export default Account;
