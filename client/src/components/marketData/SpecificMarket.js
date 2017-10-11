// Specific Market component is top level component of the FORM and SHOW subparts
import React from 'react';
import { Component } from 'react';

import SpecificMarketForm from './SpecificMarketForm';
import { reduxForm } from 'redux-form';
import SpecificMarketShow from './SpecificMarketShow';
// import { majors, altsBTC, altsETH } from './ValidConstants';
// import MarketDropDowns from './MarketDropDowns';

class SpecificMarket extends Component {
  constructor(props) {
    super(props);

    this.state = { history: [], showSpecificMarket: false, market: 'BTCETH' };
  }

  // CRA advanced state initialization
  //   state = { showBitStream: false };

  renderContent() {
    if (this.state.showSpecificMarket === true) {
      return (
        <SpecificMarketShow
          onCancel={() => this.setState({ showSpecificMarket: false })}
        />
      );
    }
    return (
      <SpecificMarketForm
        onSpecificMarketSubmit={() =>
          this.setState({ showSpecificMarket: true })}
        selectedMarket={this.state.market}
      />
    );
  }

  render() {
    // console.log('SpecificMarket state:');
    // console.log(this.state);
    return (
      <div>
        <h3>Specific Market query page.</h3>

        {this.renderContent()}
      </div>
    );
  }
}

// a fine trick
// by putting the wrapper component with a form matching sub-component
// this will auto-clear using default redux-form behavior
// but the sub-component has   destroyOnUnmount: false to preserve
export default reduxForm({
  form: 'SpecificMarketForm'
})(SpecificMarket);
