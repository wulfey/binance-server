const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
// const requireCredits = require("../middlewares/requireCredits");

//always import mongoose modeuls throguh the mongoose library outsid eof index.js
const Market = mongoose.model('markets');
const bittrex = require('node.bittrex.api');

const https = require('https');
const request = require('request');

module.exports = app => {
  //calls standard binance GET all prices api query
  app.get('/api/allPrices', requireLogin, async (req, res) => {
    const url = 'https://www.binance.com/api/v1/ticker/allPrices';
    // console.log('inside the api/markets');
    request.get(
      {
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
      },
      (err, response, data) => {
        if (err) {
          return console.log('Error:', err);
        } else if (response.statusCode !== 200) {
          return console.log('Status:', response.statusCode);
        } else {
          // console.log('data is already parsed as JSON:');
          console.log('returning JSON object');
          // console.log(data);
          res.send(data);
        }
      }
    );

    // bittrex.getmarketsummaries(function(data, err) {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   // this pipes the results into the queryResults redux store, this is on the prop in 3000
    //   res.send(data.result);
    // });
  });

  app.get(
    '/api/specificMarket/:symbol/:limit',
    requireLogin,
    async (req, res) => {
      const url = `https://www.binance.com/api/v1/depth?symbol=${req.params
        .symbol}&limit=${req.params.limit}`;
      console.log(url);
      request.get(
        {
          url: url,
          json: true,
          headers: { 'User-Agent': 'request' }
        },
        (err, response, data) => {
          if (err) {
            return console.log('Error:', err);
          } else if (response.statusCode !== 200) {
            return console.log('Status:', response.statusCode);
          } else {
            // console.log('data is already parsed as JSON:');
            console.log('returning Specific Market on YES limited query');
            // console.log(data);
            res.send(data);
          }
        }
      );
    }
  );

  //requires that the request include a :symbol paramter, put this smarts in reducer
  app.get('/api/specificMarket/:symbol', requireLogin, async (req, res) => {
    const url = `https://www.binance.com/api/v1/depth?symbol=${req.params
      .symbol}`;
    console.log(url);
    request.get(
      {
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
      },
      (err, response, data) => {
        if (err) {
          return console.log('Error:', err);
        } else if (response.statusCode !== 200) {
          return console.log('Status:', response.statusCode);
        } else {
          // console.log('data is already parsed as JSON:');
          console.log('returning Specific Market on NO LIMIT query');
          // console.log(data);
          res.send(data);
        }
      }
    );

    // bittrex.getmarketsummaries(function(data, err) {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   // this pipes the results into the queryResults redux store, this is on the prop in 3000
    //   res.send(data.result);
    // });
  });

  //retun list of sruveys for current_user === req.user
  app.post('/api/markets', async (req, res) => {
    console.log('in 5000 ------ this is req:');
    console.log(req);
    // const data = req.body
    // const { title, subject, body, recipients } = req.body;

    //     const survey = new Survey({
    //       title,
    //       body,
    //       subject,
    //       //   recipients: recipients.split(",").map(email => ({
    //       //     email
    //       //   })),
    //       recipients: recipients.split(',').map(email => ({ email: email.trim() })),
    //       //    req.user.id
    //       _user: req.user.id,
    //       dateSent: Date.now()
    //       //   lastResponded: Date
    //     });

    //     //try to send an email here?
    //     //how do you use a class to send an email?
    //     const mailer = new Mailer(survey, surveyTemplate(survey));
    //     console.log('----   Sending out an email.  ------');
    //     try {
    //       await mailer.send();
    //       await survey.save();
    //       req.user.credits -= 1;
    //       // don't want race condition that uses old, unupdated user below
    //       const user = await req.user.save();

    //       res.send(user);
    //     } catch (err) {
    //       // 422 says unprocessable request
    //       res.status(422).send(err);
    //     }
    //   });
  });

  //   //this isthe incoming post from the email response of a survey recipient
  //   //will be hard, has to webhook into platform
  //   app.post("/api/surveys/webhooks");

  //   //this will create a new suvey from perspective of user
  //   app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
  //     //somehow persist this suvey and attached as user
  //     //USER has_many SURVEYS
  //     //  req should have:  title, subject, body, recipients in a comma separating STRING

  //     const { title, subject, body, recipients } = req.body;

  //     const survey = new Survey({
  //       title,
  //       body,
  //       subject,
  //       //   recipients: recipients.split(",").map(email => ({
  //       //     email
  //       //   })),
  //       recipients: recipients.split(",").map(email => ({ email: email.trim() })),
  //       //    req.user.id
  //       _user: req.user.id,
  //       dateSent: Date.now()
  //       //   lastResponded: Date
  //     });
  //   });
};
