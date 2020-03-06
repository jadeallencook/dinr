import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';

const RSVPComponent: React.FC = () => {
    const zipcode = useSelector(state => state['zipcode']);
    const results = useSelector(state => state['results']);
    return (
        <div className="ResultsComponent container">
            {zipcode && results.length ? (
                <div>
                    <h2>RSVPs</h2>
                    {
                        results.map((result: any, index: number) => {
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