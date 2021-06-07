import chai from 'chai';
import chaiHTTP from 'chai-http';
import { DESCRIBE } from 'sequelize/types/lib/query-types';
import app from '../app';

const {expect} = chai;

chai.use(chaiHTTP);

describe('Genres', () => {
    describe('GET /genres', () => {
        it('should return an array of all the genres', (done) =>{
            chai.request(app)
                .get('/api/genres');
        })
    })
})