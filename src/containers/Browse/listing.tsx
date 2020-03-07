import React from 'react';
import { Link } from 'react-router-dom';

interface ListingComponentProps {
  listing: object | null;
  color?: string;
}

const ListingComponent: React.FC<ListingComponentProps> = (props: any) => {
  const {
    title,
    description,
    price,
    datestamp,
    ref,
    plates,
    guests
  } = props.listing;
  const date = new Date(datestamp);
  const platesLeft = guests ? plates - Object.keys(guests).length : plates;
  return (
    <Link to={ref} className={`ListingComponent ${props.color}`}>
      <h3>
        ${price} {title}
      </h3>
      <p>{description}</p>
      <ul>
        <li>
          <b>Date: </b>
          {date.toLocaleDateString()}
        </li>
        <li>
          <b>Time: </b>
          {date.toLocaleTimeString().replace(':00 ', ' ')}
        </li>
        <li>
          <b>Plates: </b>
          {platesLeft}
        </li>
      </ul>
    </Link>
  );
};

export default ListingComponent;
