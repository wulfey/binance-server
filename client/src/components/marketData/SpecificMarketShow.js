import React, { Component } from 'react';
import _ from 'lodash';
import { querySpecificMarket } from '../../actions/index';
import { connect } from 'react-redux';
import { AreaChart } from 'react-easy-chart';

class SpecificMarketShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      bids: ['Query initiated, bids coming soon.'],
      asks: ['Query initiated, asks coming soon.'],
      lastUpdateId: 0
    };
  }

  formatResults(array) {
    let formattedArray = [];
    array.map(val =>
      formattedArray.push({ x: Number(val[0]), y: Number(val[1]) })
    );
    if (formattedArray.length > 10) {
      formattedArray = this.chunkUpValues(formattedArray);
    }
    return formattedArray;
  }

  async queryRunner(market, limit) {
    console.log('trying to query using queryResults');
    this.props.querySpecificMarket(market, limit).then(() => {
      const { asks, bids, lastUpdateId } = this.props.queryResults;

      this.setState({
        history: [this.props.queryResults, ...this.state.history],
        bids: this.formatResults(bids),
        asks: this.formatResults(asks),
        lastUpdateId: lastUpdateId
      });
    });
  }

  renderValsAsArray(values, name) {
    return (
      <ul>
        {name}
        {values.map(val => {
          return (
            <li key={val[0]}>
              {val[0]}, {val[1]}
            </li>
          );
        })}
      </ul>
    );
  }

  chunkUpValues(array) {
    let tenArray = [];
    let size = array.length / 10;
    let compressedArray = _.chunk(array, size);
    compressedArray.map(entry => {
      let xSum = 0;
      let ySum = 0;

      entry.map(pair => {
        xSum += pair.x;
        ySum += pair.y;
        return 0;
      });
      tenArray.push({ x: xSum / size, y: ySum });
      return 0;
    });
    // console.log('tenArray');
    // console.log(tenArray);
    return tenArray;
  }

  renderValsAsChart() {
    return (
      <span>
        <h5>Bids and Asks</h5>
        <AreaChart axes width={500} height={250} data={[this.state.bids]} />
        <AreaChart axes width={500} height={250} data={[this.state.asks]} />
      </span>
    );
  }

  componentDidMount() {
    const { market, limit } = this.props.configOptions;
    // console.log(market, limit);
    // let market = this.props.configOptions.market;
    // let limit = this.props.configOptions.limit;
    this.queryRunner(market, limit);
  }

  render() {
    // let hiPump = this.state.outputArray[0];
    // setTimeout(function() {
    //   console.log(this.state);
    // }, 2000);
    // console.log('in render ofr specificmarketshow');
    if (this.props.redirect === false) {
      // console.log('FALSE, not rendering it');
      return <div>Enter a valid query into the form.</div>;
    }
    if (this.state.lastUpdateId === 0) {
      return <div> Query is loading. </div>;
    }
    // console.log('TRUE, lets render the market');
    return <div>{this.renderValsAsChart()}</div>;
  }
}

function mapStateToProps({ auth, queryResults }) {
  return { auth, queryResults };
}

export default connect(mapStateToProps, { querySpecificMarket })(
  SpecificMarketShow
);

// async queryBittrexLocal(reqOptions = defaultReqOptions, URI = DEFAULT_URI) {
//   // allows submission of other URIs to overload defaults
//   const proxyurl = 'https://cors-anywhere.herokuapp.com/';
//   reqOptions.uri = proxyurl + URI;

//   try {
//     console.log('trying to get JSONResults from request using bittrex API');
//     this.props.queryBittrex();
//     // let JSONResults = await request(reqOptions);

//     // let JSONResults = await bittrex.getmarketsummaries(function(data, err) {
//     //   if (err) {
//     //     return console.error(err);
//     //   }
//     //   return data.result;
//     // });

//     // console.log(this.props);
//     // const queryResults = await this.props.queryBittrex();
//     // console.log(queryResults);

//     // return queryResults;
//   } catch (err) {
//     console.log('queryBittrex API call failed : ' + err);
//   }
// }
