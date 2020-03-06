import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';

const ResultsComponent: React.FC = () => {
    const zipcode = useSelector(state => state['zipcode']);
    const results = useSelector(state => state['results']);
    return (
        <div className="ResultsComponent container">
            {zipcode && results.length ? (
                <div>
                    <h2>Results for {zipcode}</h2>
                    {
                        results.map((result: any, index: number) => {
                            const { title, description, price, datestamp, ref, plates } = result;
                            const date = new Date(datestamp);
                            return (
                                <Link to={ref} className="Result" key={`result-${index}`}>
                                    <h3>${price} {title}</h3>
                                    <p>{description}</p>
                                    <ul>
                                        <li><b>Date: </b>{date.toLocaleDateString()}</li>
                                        <li><b>Time: </b>{date.toLocaleTimeString().replace(':00 ', ' ')}</li>
                                        <li><b>Plates: </b>{plates}</li>
                                    </ul>
                                </Link>
                            )
                        })
                    }
                </div>
            ) : (
                    <div>
                        <h2>No dinners this week!</h2>
                        <p>Support Dinr by hosting a dinner in your area.</p>
                    </div>
                )}
        </div>
    );
};

export default ResultsComponent;