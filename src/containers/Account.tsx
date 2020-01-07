import React, { useState } from 'react';
import './Account.scss';

interface AccountProps {
    currentUser: any;
    setCurrentUser: any;
}

const Account: React.FC<AccountProps> = props => {

    const [createAccountToggle, setCreateAccountToggle] = useState(false);

    const updateAccountHandler = (event: any) => {
        console.log('Update Account');
        event.preventDefault();
        const form = event.target;
        const name = form.querySelector('#name').value;
        const zipcode = form.querySelector('#zipcode').value;
        const street = form.querySelector('#street').value;
    }

    const signIntoAccountHandler = (event: any) => {
        console.log('Sign Into Account');
        event.preventDefault();
    }

    const createAccountHandler = (event: any) => {
        console.log('Create Account');
        event.preventDefault();
        setCreateAccountToggle(!createAccountToggle);
    }

    const createAccountToggleHandler = (event: any) => {
        event.preventDefault();
        setCreateAccountToggle(!createAccountToggle);
    }

    if (props.currentUser) {
        return (
            <div className="Account">
                <h2>Account Settings</h2>
                <form onSubmit={updateAccountHandler}>
                    <label>Your Name</label>
                    <input id="name" type="text" placeholder="John Doe" />
                    <span>We use your name to let hosts know who is coming and guests know who is cooking.</span>
                    <label>Zipcode</label>
                    <input id="zipcode" type="number" placeholder="95111" />
                    <span>We use your zipcode to show you dinners in your area and help guests find your dinners.</span>
                    <br /><br />
                    <h3>Hosting Information</h3>
                    <label>Street</label>
                    <input id="street" type="text" placeholder="123 Main Street" />
                    <span>We use your address to direct your guests to your dinner.</span>
                    <br /><br />
                    <input type="checkbox" name="payments" value="cash" /> Cash<br />
                    <input type="checkbox" name="payments" value="venmo" /> Venmo<br />
                    <input type="checkbox" name="payments" value="cashapp" /> Cash App<br />
                    <input type="checkbox" name="payments" value="paypal" /> PayPal<br />
                    <input type="submit" className="btn confirm" value="Save Changes" />
                </form>
            </div>
        )
    } else if (!createAccountToggle) {
        return (
            <div className="Account">
                <h2>Sign In</h2>
                <form onSubmit={signIntoAccountHandler}>
                    <label>Email</label>
                    <input id="email" type="email" placeholder="johndoe@domain.com" />
                    <label>Password</label>
                    <input id="password" type="password" placeholder="•••••••••" />
                    <input type="submit" className="btn confirm" value="Sign In" />
                    <br />
                </form>
                <button className="btn" onClick={createAccountToggleHandler}>Create Account</button>
            </div>
        );
    } else {
        return (
            <div className="Account">
                <h2>Let's get cookin!</h2>
                <form onSubmit={createAccountHandler}>
                    <label>Email</label>
                    <input id="email" type="email" placeholder="johndoe@domain.com" />
                    <label>Password</label>
                    <input id="password" type="password" placeholder="•••••••••" />
                    <label>Re-Enter Password</label>
                    <input id="reenter" type="password" placeholder="•••••••••" />
                    <label>Zipcode</label>
                    <input id="zipcode" type="number" placeholder="95112" />
                    <input type="submit" className="btn confirm" value="Create Account" />
                </form>
            </div>
        );
    }
}

export default Account;
