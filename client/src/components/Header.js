import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import StripePayments from './StripePayments';
// import * as actions from "../actions";
// import { majors, altsBTC, altsETH } from './marketData/ValidConstants';
// import MarketDropDowns from './marketData/MarketDropDowns';

class Header extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   user: props.auth
  //   // };
  // }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return (
          <li>
            <a href="/">Loading...</a>
          </li>
        );
      case false:
        return (
          <li>
            <a href="/auth/google">Login Google+</a>
          </li>
        );
      default:
        return [
          <li style={{ margin: '0px 10px' }} key="4">
            Credits: {this.props.auth.credits}
          </li>,
          <li key="5">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    // console.log("In Header Component Render");
    // console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper " style={{ backgroundColor: '#2e099e' }}>
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Wulfey's Binance API
          </Link>
          <ul className="right hide-on-med-and-down">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

// export default Header;

// map state to props ...
// function mapStateToProps(state) {
//   return { auth: state.auth };
// }
// export default connect(mapStateToProps, actions)(Header);

// full ES6
function mapStateToProps({ auth }) {
  return { auth };
}
// connect with mapStateToProps effecitvley turns this onto a captive variable
// it will be STATE without declaring it, auto update
// don't need second argument here ... just getting the auth off the store
export default connect(mapStateToProps)(Header);
