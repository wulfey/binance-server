import React, { Component } from 'react';
import { connect } from 'react-redux';
import { queryAllMarkets } from '../../actions/index';

class AllMarketDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMarkets: []
    };
  }

  renderAllMarket(allMarkets) {
    if (allMarkets === [] || allMarkets === undefined) {
      return <p>Results loading.</p>;
    }

    return (
      <tbody>
        {allMarkets.map(market => {
          return this.renderSingleMarket(market);
        })}
      </tbody>
    );
  }

  renderSingleMarket({ symbol, price }) {
    // let symbol = market.symbol;
    // let pumps = market.pumps;
    // let lastArray = market.lastArray;
    return (
      <tr key={symbol}>
        <td>
          <a
            target="_blank"
            href={`https://www.binance.com/trade.html?symbol=${symbol.slice(
              0,
              3
            )}_${symbol.slice(3, symbol.length)}`}
          >
            {symbol}
          </a>
        </td>
        <td>
          <a
            target="_blank"
            href={`https://www.binance.com/trade.html?symbol=${symbol.slice(
              0,
              3
            )}_${symbol.slice(3, symbol.length)}`}
          >
            {price}
          </a>
        </td>
      </tr>
    );
  }

  componentWillMount() {
    this.props.queryAllMarkets().then(() => {
      this.setState({
        allMarkets: this.props.allMarkets
      });
    });
  }

  render() {
    // console.log('This is props:');
    // console.log(this.props);
    // console.log('This is state:');
    // console.log(this.state);
    return (
      <div>
        <div style={{ marginBottom: '5%' }}>
          <button
            className="btn waves-effect waves-light"
            onClick={() => {
              this.props.queryAllMarkets().then(() => {
                this.setState({
                  allMarkets: this.props.allMarkets
                });
              });
            }}
          >
            Refresh Values
          </button>
        </div>
        <div className="left">
          <table className="table table-hover">
            <thead>
              <tr>
                <th> Symbol </th>
                <th> Price </th>
              </tr>
            </thead>
            {this.renderAllMarket(this.state.allMarkets)}
          </table>
          <br />
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, queryResults }) {
  return { auth, queryResults };
}

export default connect(mapStateToProps, { queryAllMarkets })(AllMarketDisplay);
