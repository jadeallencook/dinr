import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const RSVPComponent: React.FC = () => {
    const rsvps = [{
        "datestamp": "Sat, 07 Mar 2020 23:00:00 GMT",
        "description": "Best potato soup ",
        "plates": 10,
        "price": 1,
        "profile": "kCfrKK6cbcQwHl3lYd0A6JN2G1r1",
        "title": "Potato soup"
    }];
    return (
        <div className="RSVPComponent container">
            {rsvps.length ? (
                <div>
                    <h2>RSVPs</h2>
                    {
                        rsvps.map((result: any, index: number) => {
                            const { title, description, datestamp, ref } = result;
                            const date = new Date(datestamp);
                            return (
                                <Link to={ref} className="Result" key={`result-${index}`}>
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                    <ul>
                                        <li><b>Date: </b>{date.toLocaleDateString()}</li>
                                        <li><b>Time: </b>{date.toLocaleTimeString().replace(':00 ', ' ')}</li>
                                    </ul>
                                </Link>
                            )
                        })
                    }
                </div>
            ) : (
                    <div>
                        <h2>You have no RSVPs!</h2>
                        <p>Support Dinr by hosting a dinner in your area.</p>
                    </div>
                )}
        </div>
    );
};

export default RSVPComponent;