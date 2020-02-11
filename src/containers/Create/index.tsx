import React from 'react';
import './style.scss';

const CreateComponent: React.FC = () => {
  return (
    <div className="CreateComponent container">
      <h2>Host Dinner</h2>
      <form>
        <label>Title</label>
        <input
          className="brand margin-bottom"
          type="text"
          placeholder="Taco Night"
        />
        <label>Price (USD)</label>
        <input className="brand margin-bottom" type="number" placeholder="8" />
        <label>Plates</label>
        <input className="brand margin-bottom" type="number" placeholder="5" />
        <label>Date</label>
        <select
          className="brand margin-right"
          defaultValue={new Date().getMonth() + 1}
        >
          {new Array(12).fill(null).map((value, index) => {
            return (
              <option value={index + 1} key={`month-${index}`}>
                {index + 1}
              </option>
            );
          })}
        </select>
        <select
          className="brand margin-right"
          defaultValue={new Date().getDate()}
        >
          {new Array(31).fill(null).map((value, index) => {
            return (
              <option value={index + 1} key={`month-${index}`}>
                {index + 1}
              </option>
            );
          })}
        </select>
        <select className="brand margin-bottom">
          <option>2020</option>
        </select>
        <label>Time</label>
        <select className="brand margin-right" defaultValue={'6'}>
          {new Array(12).fill(null).map((value, index) => {
            return (
              <option value={index + 1} key={`month-${index}`}>
                {index + 1}
              </option>
            );
          })}
        </select>
        <select className="brand margin-right" defaultValue="00">
          <option>00</option>
          <option>15</option>
          <option>30</option>
          <option>45</option>
        </select>
        <select className="brand margin-bottom" defaultValue="PM">
          <option>AM</option>
          <option>PM</option>
        </select>
        <label>Description</label>
        <textarea
          placeholder="Say something about your dinner..."
          className="brand"
        ></textarea>
        <br />
        <br />
        <input className="brand primary-bg" type="submit" value="Post Dinner" />
      </form>
    </div>
  );
};

export default CreateComponent;
