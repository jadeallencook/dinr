import React from 'react';
import './Create.scss';
import { Link } from 'react-router-dom';

interface CreateProps {
}

const Create: React.FC<CreateProps> = props => {

    const handler = (event: any) => {
        event.preventDefault();
    }

    return (
        <div className="Create">
            <h2>Host A Dinner</h2>
            <form onSubmit={handler}>
                <label>Title</label>
                <input type="text" placeholder="Taco Night" />
                <label>Description</label>
                <textarea placeholder="We are having tacos at our place..."></textarea>
                <label>Plates</label>
                <input type="number" placeholder="7" />
                <label>Price (USD)</label>
                <input type="number" placeholder="5" />
                <label>Date</label>
                <input type="date" placeholder="XX/XX/20XX" />
                <label>Time</label>
                <input type="time" placeholder="1:00 PM" />
                <br /><br />
                <input type="submit" value="Post your dinner" className="btn confirm" />
            </form>
            <br />
            <Link to="/" className="btn">Cancel and return to results</Link>
        </div>
    )
}

export default Create;
