const { expect } = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const { fetchPopularTV } = require('../src/services/tvSeries');
const config = require('../src/config');

describe('TV Series Service', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should fetch popular TV series', async () => {
        const mockData = { results: [{ id: 1, name: 'TV Show 1' }] };
        sandbox.stub(axios, 'get').resolves({ data: mockData });

        const popularTV = await fetchPopularTV();
        expect(popularTV).to.deep.equal(mockData.results);
        expect(axios.get.calledOnceWith(`${config.tmdbApiUrl}/tv/popular`, {
            params: {
                api_key: config.tmdbApiKey,
                page: 1,
                language: 'it-IT'
            },
            timeout: 10000
        })).to.be.true;
    });

    it('should handle errors when fetching popular TV series', async () => {
        sandbox.stub(axios, 'get').rejects(new Error('Network Error'));

        try {
            await fetchPopularTV();
        } catch (error) {
            expect(error.message).to.equal('Network Error');
        }
    });
});