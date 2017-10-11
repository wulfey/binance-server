import React, { Component } from 'react';

// import Select from 'react-basic-dropdown';
// to have default stylesheets. Optional
// import styles from 'react-basic-dropdown/dist/styles.css';

class MarketDropDowns extends Component {
  render() {
    const name = this.props.markets[0];
    const markets = this.props.markets[1];
    return (
      <div>
        <a
          className="dropdown-button btn"
          href="#*"
          data-beloworigin="true"
          data-activates={`${name}`}
        >
          {name}
        </a>

        <ul id={`${name}`} className="dropdown-content">
          {markets.map(market => {
            return (
              <li key={market}>
                <a
                  href="#!"
                  onClick={() => {
                    console.log('you clicked');
                    this.props.setMarket(market);
                  }}
                >
                  {market}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default MarketDropDowns;
