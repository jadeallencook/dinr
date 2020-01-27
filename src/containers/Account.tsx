import React, { useState } from 'react';
import './Account.scss';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { Profile } from '../interfaces'
import * as zipcodeToStateAndCity from '../assets/reverse-zipcode.json';

interface AccountProps {
    currentUser: any;
    currentProfile: any;
    setCurrentProfile: any;
    setCurrentUser: any;
    setSearchState: any;
    setSearchCity: any;
}

const Account: React.FC<AccountProps> = props => {
    const [createAccountToggle, setCreateAccountToggle] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const isZipcodeValid = (zipcode: string): boolean => (Number(zipcode) > 10000 && Number(zipcode) < 99999);

    const getProfileSnapshot = () => firebase
        .database()
        .ref(`profiles/${props.currentUser.uid}`)
        .once('value')
        .then(snapshot => {
            console.log(`GET: profiles/${props.currentUser.uid}`);
            props.setCurrentProfile(snapshot.val())
        });

    const updateAccountHandler = (event?: any) => {
        if (event) {
            event.preventDefault();
        }
        const form = event ? event.target : null;
        const name = form ? form.querySelector('#name').value : '';
        const zipcode = form ? form.querySelector('#zipcode').value : '';
        const street = form ? form.querySelector('#street').value : '';
        let accepted: string[] = [];
        if (form) {
            form.querySelectorAll('input[name="payments"]:checked')
                .forEach((elem: any) => accepted.push(elem.value));
        }
        const payments = (accepted.length) ? {
            cash: (accepted.indexOf('cash') !== -1),
            venmo: (accepted.indexOf('venmo') !== -1),
            paypal: (accepted.indexOf('paypal') !== -1),
            cashapp: (accepted.indexOf('cashapp') !== -1),
        } : { cash: true, venmo: false, paypal: false, cashapp: false };
        const personal = { name, zipcode, street };
        if (zipcode && !isZipcodeValid(zipcode)) {
            setErrorMessage('The zipcode that you entered is invalid.');
            delayedMessageReset();
        } else {
            Promise.all([
                new Promise(res => {
                    console.log(`SET: profiles/${props.currentUser.uid}/personal`);
                    console.log(`SET: profiles/${props.currentUser.uid}/payments`);
                    firebase
                        .database()
                        .ref(`profiles/${props.currentUser.uid}/personal`)
                        .set(personal)
                        .then(() => res())
                        .catch(error => setErrorMessage(error.message));
                }),
                new Promise(res => {
                    firebase.database()
                        .ref(`profiles/${props.currentUser.uid}/payments`)
                        .set(payments)
                        .then(() => res())
                        .catch(error => setErrorMessage(error.message));
                })
            ]).then(() => {
                setSuccessMessage('Your profile has been updated!');
                delayedMessageReset();
                getProfileSnapshot();
                let [city, state]= zipcodeToStateAndCity[zipcode].split(':');
                props.setSearchCity(city);
                props.setSearchState(state);
            }).catch(() => delayedMessageReset());
        }
    }

    const signoutOfAccount = () => firebase.auth().signOut();

    const delayedMessageReset = () => setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
    }, 2500);

    const signIntoAccountHandler = (event: any) => {
        event.preventDefault();
        const form = event.target;
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                setErrorMessage(error.message);
                delayedMessageReset();
            });
    }

    async function createAccountHandler(event: any) {
        event.preventDefault();
        const form = event.target;
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        const reenter = form.querySelector('#reenter').value;
        const zipcode = form.querySelector('#zipcode').value;
        let user: firebase.User | null = null;
        let uid: string | undefined;
        if (!email || !password || !reenter || !zipcode) {
            setErrorMessage('You forgot to to fill out an input');
        } else if (password !== reenter) {
            setErrorMessage('Your passwords do not match');
        } else if (zipcode < 10000 || zipcode > 99999) {
            setErrorMessage('The zipcode you entered is not valid');
        } else {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(error => {
                    setErrorMessage(error.message);
                });
            if (!errorMessage) {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(creds => {
                        user = creds.user;
                        uid = user?.uid;
                    }).catch(error => {
                        setErrorMessage(error.message);
                    });
            }
            if (!errorMessage && user) {
                const template: Profile = {
                    personal: { zipcode },
                    payments: { cash: true, venmo: false, cashapp: false, paypal: false },
                    dinners: { host: [], eaten: [] },
                    reviews: { left: [], recieved: [] }
                };
                await firebase
                    .database()
                    .ref(`profiles/${uid}`)
                    .set(template)
                    .then(() => {
                        console.log(`SET: profiles/${uid}`);
                        props.setCurrentProfile(template);
                        props.setCurrentUser(user);
                        setCreateAccountToggle(false);
                    }).catch(error => setErrorMessage(error.message));
            }
        }
        delayedMessageReset();
    }

    const createAccountToggleHandler = (event: any) => {
        event.preventDefault();
        setCreateAccountToggle(!createAccountToggle);
    }

    if (props.currentUser && props.currentProfile) {
        const { name, zipcode, street } = props.currentProfile.personal;
        const { email } = props.currentUser;
        const { cash, venmo, cashapp, paypal } = props.currentProfile.payments;
        return (
            <div className="Account">
                <h2>Account Settings</h2>
                <p>We strive to transparent to our users by providing you with information about how we use your data. By only requiring the necessary information to make the app function and not over monitoring user activity, we can protect our users' privacy.</p>
                <br />
                <form onSubmit={updateAccountHandler}>
                    <label>Your Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="john@domain.com"
                        defaultValue={email}
                        disabled
                    />
                    <span>This is the email you used to create this account and cannot be changed at the moment. We use your email to create a unique profile for you and send you reservation updates.</span>
                    <label>Your Name</label>
                    <input
                        defaultValue={name}
                        id="name"
                        type="text"
                        placeholder="John Doe"
                    />
                    <span>We use your name to let hosts know who is coming and guests know who is cooking. Although it is not required, it is highly recommended that you add your name.</span>
                    <label>Zipcode</label>
                    <input
                        defaultValue={zipcode}
                        id="zipcode"
                        type="number"
                        placeholder="95102"
                    />
                    <span>We use your zipcode to show you dinners in your area and help guests find your dinners. This field is not required if you are not hosting a dinner but will help you find dinners.</span>
                    <br /><br />
                    <h3>Hosting Information</h3>
                    <p>If you plan on hosting a dinner we will need you to provide an address, zipcode, and forms of accepted payments. You will encounter an error that will redirect you here when creating a dinner without supplying all the necessary data.</p>
                    <label>Street</label>
                    <input
                        defaultValue={street}
                        id="street"
                        type="text"
                        placeholder="123 Main Street"
                    />
                    <span>We use your address to direct your guests to your dinner.</span>
                    <br /><br />
                    <input
                        type="checkbox"
                        name="payments"
                        value="cash"
                        defaultChecked={cash}
                    /> Cash<br />
                    <input
                        type="checkbox"
                        name="payments"
                        value="venmo"
                        defaultChecked={venmo}
                    /> Venmo<br />
                    <input
                        type="checkbox"
                        name="payments"
                        value="cashapp"
                        defaultChecked={cashapp}
                    /> Cash App<br />
                    <input
                        type="checkbox"
                        name="payments"
                        value="paypal"
                        defaultChecked={paypal}
                    /> PayPal<br />
                    {(errorMessage) ? <span id="error">{errorMessage}</span> : null}
                    {(successMessage) ? <span id="success">{successMessage}</span> : null}
                    <input type="submit" className="btn confirm" value="Save Changes" />
                </form>
                <br />
                <button onClick={signoutOfAccount} className="btn">Sign Out</button>
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
                    {(errorMessage) ? <span id="error">{errorMessage}</span> : null}
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
                    {(errorMessage) ? <span id="error">{errorMessage}</span> : null}
                    <input type="submit" className="btn confirm" value="Create Account" />
                </form>
            </div>
        );
    }
}

export default Account;
