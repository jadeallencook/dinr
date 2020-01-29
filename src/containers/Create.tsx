import React, { useState } from 'react';
import './Create.scss';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { Dinner } from '../interfaces';
import reveseZipcode from '../assets/reverse-zipcode.json';

interface CreateProps {
    currentUser: any;
    currentProfile: any;
}

const Create: React.FC<CreateProps> = props => {
    const [errorMessage, setErrorMessage] = useState('');
    let date = new Date();

    const readableFormatReserseZipcode = (key: string): string => {
        let location = reveseZipcode[key];
        let [city, state] = location.split(':');
        city = city.split(' ');
        for (var i = 0, x = city.length; i < x; i++) {
            city[i] = city[i][0].toUpperCase() + city[i].substr(1);
        }
        state = state.toUpperCase();
        return `${city.join(' ')}, ${state}`;
    }

    const generateDinnerFirebaseRef = (location: string, date: {
        month: number;
        day: number;
        year: number;
    }): string => {
        location = reveseZipcode[location];
        location = location.split(' ').join('');
        location = location.split(':').join('_');
        let month = date.month < 10 ? `0${date.month}` : `${date.month}`;
        let day = date.day < 10 ? `0${date.day}` : `${date.day}`;
        let datestamp = `${month}${day}${date.year}`;
        return `${location}_${datestamp}`;
    }

    const handler = (event: any) => {
        event.preventDefault();
        const form = event.target;
        const title = form.querySelector('#title').value;
        const description = form.querySelector('#description').value;
        let plates = form.querySelector('#plates').value;
        plates = parseInt(plates);
        let price = form.querySelector('#price').value;
        price = parseInt(price);
        let month = form.querySelector('#month').value;
        month = parseInt(month);
        let day = form.querySelector('#day').value;
        day = parseInt(day);
        let year = form.querySelector('#year').value;
        year = parseInt(year);
        const hour = form.querySelector('#hour').value;
        const minute = form.querySelector('#minute').value;
        const ampm = form.querySelector('#ampm').value;
        const datestamp = `${month}/${day}/${year}`;
        let time: number = parseInt(hour);
        time = ampm === 'PM' ? time + 12 : time;
        time = time * 100;
        time = minute === '30' ? time + 30 : time;
        if (!title || !description || !plates || !price || !month || !day || !year) {
            setErrorMessage('You forgot to fill out a field.');
        } else if (plates <= 0) {
            setErrorMessage('You entered an incorrect number for plates.');
        } else if (price <= 0 || price >= 10000) {
            setErrorMessage('You entered an incorrect price.');
        } else if (date >= new Date(datestamp)) {
            setErrorMessage('Select a date atleast 1 day from today.');
        } else if (time < 0 || time > 2400) {
            setErrorMessage(`You've entered an incorrect time.`);
        } else {
            date = new Date(`${datestamp} ${time}`);
            const dinner: Dinner = {
                title,
                description,
                image: null,
                profile: props.currentUser.uid,
                plates,
                price,
                date: {
                    month, day, year
                },
                time,
                attending: []
            }
            const ref = `dinners/${generateDinnerFirebaseRef(
                props.currentProfile.personal?.zipcode,
                { month, day, year }
            )}`;
            firebase
                .database()
                .ref(ref)
                .push(dinner).then(() => {
                    window.location.hash = '';
                });
        }
        setTimeout(() => setErrorMessage(''), 2500);
    }

    return (
        <div className="Create">
            <h2>Host A Dinner</h2>
            <form onSubmit={handler}>
                <label>Title</label>
                <input type="text" id="title" placeholder="Taco Night" maxLength={50} />
                <label>Description</label>
                <textarea id="description" maxLength={250} placeholder="We are having tacos at our place..."></textarea>
                <label>Plates</label>
                <input type="number" min="1" max="15" id="plates" placeholder="7" defaultValue={5} />
                <label>Price (USD)</label>
                <input type="number" min="1" max="1000" id="price" placeholder="5" defaultValue={7} />
                <label>Date</label>
                <select id="month" defaultValue={date.getMonth()}>
                    {
                        ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                            'August', 'September', 'October', 'November', 'December']
                            .map((month: string, index: number) => <option
                                value={index + 1}
                                key={month}>
                                {index + 1} - {month}
                            </option>
                            )
                    }
                </select>
                <select id="day" defaultValue={date.getDate()}>
                    {
                        new Array(31).fill(null).map((value, index: number) => <option
                            value={index + 1}
                            key={`day-${index + 1}`}>
                            {index + 1}
                        </option>
                        )
                    }
                </select>
                <select id="year" defaultValue={date.getFullYear()} disabled={date.getMonth() < 11}>
                    {
                        new Array(2).fill(null).map((value, index: number) => <option
                            value={date.getFullYear() + index}
                            key={`year-${date.getFullYear() + index}`}>
                            {date.getFullYear() + index}
                        </option>
                        )
                    }
                </select>
                <br />
                <label>Time</label>
                <select defaultValue={6} id="hour">
                    {
                        new Array(12).fill(null).map((value, index: number) => <option
                            value={index + 1}
                            key={`hour-${index + 1}`}>
                            {index + 1}
                        </option>
                        )
                    }
                </select>
                <select defaultValue={'00'} id="minute">
                    {
                        ['00', '30'].map((value, index: number) => <option
                            value={value}
                            key={`minutes-${index}`}>
                            {value}
                        </option>
                        )
                    }
                </select>
                <select defaultValue={'PM'} id="ampm">
                    {
                        ['AM', 'PM'].map((value, index: number) => <option
                            value={value}
                            key={`ampm-${index}`}>
                            {value}
                        </option>
                        )
                    }
                </select>
                <br />
                <label>Location</label>
                {props.currentProfile.personal?.street} {readableFormatReserseZipcode(props.currentProfile.personal?.zipcode)}
                {errorMessage ? <span id="error">{errorMessage}</span> : null}
                <br /><br />
                <input type="submit" value="Post your dinner" className="btn confirm" />
            </form>
            <br />
            <Link to="/" className="btn">Cancel and return to results</Link>
        </div>
    )
}

export default Create;
