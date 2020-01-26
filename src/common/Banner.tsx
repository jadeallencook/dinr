import React from 'react';
import './Banner.scss';
import { Link } from 'react-router-dom';

interface BannerInterface {
  currentUser: any;
  currentProfile: any;
}

const Banner: React.FC<BannerInterface> = props => {
  return (
    <Link to={(
      props.currentUser &&
      props.currentProfile &&
      props.currentProfile.personal?.street &&
      props.currentProfile.personal?.zipcode
    ) ? `/create` : `/account`} className="Banner">
      <h1>
        <span>HOST YOUR OWN</span><br />DINR</h1>
    </Link>
  );
}

export default Banner;
