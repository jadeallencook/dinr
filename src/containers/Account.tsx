import React from 'react';
import './Account.scss';

interface AccountProps {
    currentUser: any;
    setCurrentUser: any;
}

const Account: React.FC<AccountProps> = props => {

    const handler = (event: any) => {
        event.preventDefault();
        const form = event.target;
        const name = form.querySelector('#name').value;
        const zipcode = form.querySelector('#zipcode').value;
        const street = form.querySelector('#street').value;
        console.log(name, zipcode, street);
    }

    return (
        <div className="Account">
            <h2>Account Settings</h2>
            <form onSubmit={handler}>
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
                <input type="submit"  className="btn confirm" value="Save Changes" />
            </form>
        </div>
    )
}

export default Account;
