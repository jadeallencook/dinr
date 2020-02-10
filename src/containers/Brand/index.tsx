import React from 'react';
import './style.scss';

const BrandComponent: React.FC = () => {
  return (
    <div className="BrandComponent container">
      <h2>Dinr Brand Guidelines</h2>
      <p>Please follow these guidelines before contributing any code.</p>
      <h3>Containers</h3>
      <p>
        A container is the presentational component that we use for all the
        routes. All containers should use the <b>"container"</b> class to ensure
        all have the same margin and padding.
      </p>
      <h3>Headers</h3>
      <p>
        The <b>"h2"</b> tag is used as the main header and the <b>"h3"</b> is
        used for subheaders.
      </p>
      <h3>Inputs & Buttons</h3>
      <p>
        Inputs and buttons use the <b>"brand"</b> class.
      </p>
      <input
        type="text"
        className="brand margin-bottom"
        placeholder="Text input"
      />
      <br />
      <button className="brand">Button</button>
      <p>
        You can change the background color by adding the classes{' '}
        <b>"brand-bg"</b>, <b>"primary-bg"</b> and, <b>"secondary-bg"</b>.
      </p>
      <button className="brand margin-right brand-bg">Brand</button>
      <button className="brand margin-right primary-bg">Primary</button>
      <button className="brand secondary-bg">Secondary</button>
      <h3>Other</h3>
      <p>
        You can add space to the right/bottom by using the classes{' '}
        <b>"margin-right"</b> and <b>"margin-bottom"</b>.
      </p>
    </div>
  );
};

export default BrandComponent;
