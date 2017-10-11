import React, { Component } from 'react';

import { Link } from 'react-router-dom';

/*
LinkList outline 

Home
  /landing

Market Data
  Get allMarkets
    /allMarkets   [default]
  Get specificMarket
    /specificMarket
      /link to placeOrder
      /link to check Orders/Positions on market

Trading
  Place new order
    /placeOrder
      /orderForm
      // place both MARKET and LIMIT
  View orders
    /viewOrders
  View positions
    /viewPositions    [default]
    
My Account

Manage Orders


*/

class LinkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: '',
      subApp: 'none'
    };
  }

  renderSubTab() {
    switch (this.state.selection) {
      case 'Get Market Data':
        return (
          <div className="left" style={{ marginBottom: '5%' }}>
            {this.renderSubAppButton('Get allMarkets')}
            {this.renderSubAppButton('Get specificMarket')}
          </div>
        );
      case 'Place Orders':
        return (
          <div className="left" style={{ marginBottom: '5%' }}>
            {this.renderSubAppButton('Limit Orders')}
            {this.renderSubAppButton('Market Orders')}
          </div>
        );
      case 'My Orders':
        return (
          <div className="left" style={{ marginBottom: '5%' }}>
            {this.renderSubAppButton('Open Orders')}
            {this.renderSubAppButton('My Positions')}
          </div>
        );
      // case 'SearchApps':
      //   return (
      //     <div className="left" style={{ marginBottom: '5%' }}>
      //       {this.renderSubAppButton('Video Search App')}
      //       {this.renderSubAppButton('Weather App')}
      //     </div>
      //   );
      // case 'CryptoApps':
      //   return (
      //     <div className="left" style={{ marginBottom: '5%' }}>
      //       {this.renderSubAppButton('Bitpump App')}
      //       {this.renderSubAppButton('HiveMiner App')}
      //     </div>
      //   );
      // case 'MailerApps':
      //   return (
      //     <div className="left" style={{ marginBottom: '5%' }}>
      //       {this.renderSubAppButton('Survey App')}
      //     </div>
      //   );
      default:
        return <div />;
    }
  }

  myColor(position, subApp) {
    if (this.state.selection === position) {
      return `red`;
    } else if (this.state.subApp === position) {
      return 'purple';
    } else if (subApp) {
      return 'teal';
    }
    return `amber`;
  }

  getRoute(name) {
    switch (name) {
      case 'Get allMarkets':
        return '/marketData/AllMarketDisplay';
      case 'Get specificMarket':
        return '/marketData/SpecificMarket';
      default:
        return '/';
    }
  }

  renderSubAppButton(name) {
    return (
      <Link
        className={`waves-effect waves-light ${this.myColor(
          name,
          true
        )} darken-4 btn`}
        to={this.getRoute(name)}
        onClick={() => {
          this.setState({ subApp: name });
        }}
      >
        {name}
      </Link>
    );
  }

  renderButton(name) {
    return (
      <button
        className={`waves-effect waves-light ${this.myColor(
          name,
          false
        )} darken-4 btn`}
        onClick={() => {
          this.setState({ selection: name });
          this.setState({ subApp: 'none' });
        }}
      >
        {name}
      </button>
    );
  }

  render() {
    // console.log(this.state);

    return (
      // over tab
      <div style={{ marginBottom: '10%' }}>
        <div className="left">
          <Link
            className={`waves-effect waves-light ${this.myColor(
              '',
              false
            )} darken-4 btn`}
            onClick={() => {
              this.setState({ selection: '' });
              this.setState({ subApp: 'none' });
            }}
            to="/"
          >
            Home Page
          </Link>
          {this.renderButton('Get Market Data')}
          {this.renderButton('Place Orders')}
          {this.renderButton('My Orders')}

          <div style={{ marginBottom: '10%' }}>{this.renderSubTab()}</div>
        </div>
      </div>
      // sub tab
    );
  }
}

export default LinkList;
