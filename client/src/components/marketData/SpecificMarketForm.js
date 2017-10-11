import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SpecificMarketShow from './SpecificMarketShow';
import {
  validLimits,
  validMarkets,
  majors,
  altsBTC,
  altsETH
} from './ValidConstants';
import MarketDropDowns from './MarketDropDowns';
// import _ from 'lodash';
// import { Field, reduxForm } from 'redux-form';
import { Field, reduxForm, Form } from 'redux-form';
import { load as loadForm } from '../../actions';
// import { load as loadAccount } from './account';

import { connect } from 'react-redux';

class SpecificMarketForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      market: 'ETHBTC',
      limit: 100
    };

    this.handleChangeMarket = this.handleChangeMarket.bind(this);
    this.handleChangelimit = this.handleChangelimit.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  // handleChange = this.handleChange.bind(this);
  // handleSubmit = this.handleSubmit.bind(this);

  handleChangeMarket(event) {
    this.setState({ firstSymbol: event.target.value });
  }

  handleChangelimit(event) {
    let limit = event.target.value;
    if (validLimits.indexOf(limit)) {
      this.setState({ limit });
    }
  }

  //   handleSubmit(event) {
  //     // block submission
  //     event.preventDefault();
  //     // console.log(
  //     //   `Some state: ${this.state.secondSymbol}, ${this.state.firstSymbol}, ${this
  //     //     .state.limit}`
  //     // );
  //     this.setState({ redirect: true });

  //     // console.log(this.state.title);
  //     // mutate the server
  //     // this.props
  //     //   .mutate({
  //     //     variables: { title: this.state.title },
  //     //     refetchQueries: [{ query: fetchSongs }] //ES6 options here, also variables:
  //     //   })
  //     //   //   .then(() => history.push("/lyrical"));
  //     //   .then(() => this.setState({ redirect: true }));
  //   }

  componentWillMount() {
    const { load } = this.props;
    load(this.state);
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    // let market = this.state.market;
    // destructuring -- you can pull stuff off of these long ass JS chains
    // field.meta.touched can be rewritten as just touched
    // console.log(field);
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>

        <input className="form-control" type="text" {...field.input} />
        <div
          className="text-help red-text text-darken-4"
          style={{ marginBottom: '5%' }}
        >
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // needs to be .bind(this) or else you will lose the context
    // console.log('submitting');
    // console.log(values);

    // console.log(
    //   `Some state: ${this.state.secondSymbol}, ${this.state.firstSymbol}, ${this
    //     .state.limit}`
    // );
    const { market, limit } = values;
    this.setState({ market, limit, redirect: true });
    // we really want to be calling an action creator here

    // this.props.createPost(values, () => {
    //   this.props.history.push('/posts');
    // });
  }

  // a render function that sets the state

  // render function calls the interval that keeps querying and setting the state

  // some kind of write out line here somewhere

  reinitializeForm() {
    this.props.load(this.state).then(() => {
      this.props.initialize(this.props.initialValues);
    });
  }

  render() {
    // handleSubmit is passed into this by reduxForm
    const { handleSubmit, load } = this.props;

    if (this.state.redirect) {
      console.log('trying to render specific market');
      let configOptions = {
        market: this.state.market,
        limit: this.state.limit
      };
      console.log(configOptions);
      //TODO: I think that this should really be a display of a component
      return (
        <SpecificMarketShow
          configOptions={configOptions}
          render={this.state.redirect}
        />
        // <Redirect to="/bitpump" configOptions={configOptions} />;
      );
    }
    console.log('STATE of form');
    console.log(this.state);
    console.log('PROPS of form');
    console.log(this.props);

    return (
      <div>
        <MarketDropDowns
          markets={majors}
          setMarket={async market => {
            this.setState({ market }, this.reinitializeForm());
          }}
        />
        <MarketDropDowns
          markets={altsBTC}
          setMarket={market => {
            this.setState({ market }, this.reinitializeForm());
          }}
        />
        <MarketDropDowns
          markets={altsETH}
          setMarket={market => {
            this.setState({ market }, this.reinitializeForm());
          }}
        />
        <div>
          <button
            type="button"
            onClick={async () => {
              load(this.state).then(() => {
                this.props.initialize(this.props.initialValues);
              });
            }}
          >
            Load Default
          </button>
        </div>
        <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            name="market"
            component={this.renderField}
            label="Market"
            type="text"
            placeholder="KNCBTC"
          />

          <Field
            name="limit"
            component={this.renderField}
            label="Limit"
            type="number"
            placeholder="50"
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link className="button" to="/">
            Home
          </Link>
        </Form>
      </div>
    );
  }
}

function validate(values) {
  //console.log(values) -> { submissions for title:, categories:, content: }
  const errors = {};

  if (validMarkets.indexOf(values.market) < 0) {
    errors.market = 'Please enter a valid market in AAABBB format.';
  }

  if (validLimits.indexOf(values.limit) < 0) {
    errors.limit =
      'Please enter one of these valid limits: 5, 10, 20, 50, 100, 200, 500';
  }

  // if empty, then submits
  // if that isn't empty, then it is invalid
  //   console.log(errors);
  return errors;
}

// this needs to match up with the redux form language --- check the redux form code
// export default SpecificMarketForm;

// export default reduxForm({
//   validate,
//   form: 'SpecificMarketForm'
// })(SpecificMarketForm);

function mapStateToProps({ initializeForm }) {
  return { initializeForm };
}

let InitializeFromStateForm = reduxForm({
  //this is a dummy name i think
  validate,
  form: 'SpecificMarketForm', // this is the name for your form for Redux
  enableReinitialize: true //this lets you do the multi updating, critical for dynamism
})(SpecificMarketForm); //this links your REACT COMPONENT into the form

InitializeFromStateForm = connect(
  //this is the fist call the connect, it expects functio first, and then the thing to be bound

  state => ({
    initialValues: state.initializeForm.data
    // pull initial values from account reducer
    // this is literally pulling off of the data below in the action
    // export const load = data => ({ type: LOAD, data });
    // initializeForm is the label of the reduce from combine reducers
  }),
  { load: loadForm } // bind account loading action creator
)(InitializeFromStateForm);

// this is the more standard mapstatetoprops to move the action creator into props
InitializeFromStateForm = connect(
  mapStateToProps,
  { loadForm } // bind account loading action creator
)(InitializeFromStateForm);

// export the other named component as a higher order component wrapping your form
export default InitializeFromStateForm;
