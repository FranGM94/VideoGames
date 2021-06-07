/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { v4: uuidv4 } = require ('uuid');
const { Videogame, conn } = require('../../src/db.js');
const { request } = require('../../src/app.js');

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
  id: uuidv4(),
  description: "",

};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogames', () => {
    it('should get a Json and status 200  ', function (done) {
      agent.get('/api/videogames')
      .expect('Content-Type', /json/)
      .expect(200, done());
      }
    );
  });
});
