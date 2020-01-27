import React, { useState } from 'react';
import './Create.scss';
import { Link } from 'react-router-dom';

interface CreateProps {
}

const Create: React.FC<CreateProps> = props => {
    const [errorMessage, setErrorMessage] = useState('');
    const date = new Date();

    const handler = (event: any) => {
        event.preventDefault();
        const form = event.target;
        const title = form.querySelector('#title').value;
        const description = form.querySelector('#description').value;
        const plates = form.querySelector('#plates').value;
        const price = form.querySelector('#price').value;
        const month = form.querySelector('#month').value;
        const day = form.querySelector('#day').value;
        const year = form.querySelector('#year').value;
        if (!title || !description || !plates || !price || !month || !day || !year) {
            setErrorMessage('You forgot to fill out a field.');
        } else if (Number(plates) <= 0) {
            setErrorMessage('You entered an incorrect number for plates.');
        } else if (Number(price) <= 0) {
            setErrorMessage('You entered an incorrect price.');
        } else {
            console.log(title, description, plates, price, `${month}/${day}/${year}`);
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
                <textarea id="description" maxLength={150} placeholder="We are having tacos at our place..."></textarea>
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
