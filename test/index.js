const { describe, it } = require('mocha');
const { expect } = require('chai');
const { jsonParser, sendRequest } = require('../src');

describe('Fetch method', () => {
  let responseJson;

  before(async () => {
    await sendRequest();
  });

  beforeEach(() => {
    responseJson = require('../src/response.json');
  });

  it('should receive items', () => {
    responseJson.forEach(item => expect(typeof item).to.be.equal('object'));
  });

  it('should contain ids below 20', () => {
    responseJson.map(({ id }) => id).forEach(id => expect(id).to.be.below(20));
  });
});

describe('JSON Parser', () => {
  let parserJson;

  before(async () => {
    await jsonParser();
  });

  beforeEach(() => {
    parserJson = require('./src/parsed.json');
  });

  it('.html should be replaced for every item', () => {
    expect(parserJson.every(({ docId }) => docId.includes('html'))).to.be.equal(false);
  });

  it('every item should contain http://doc.epam.com/ string', () => {
    expect(parserJson.every(({ docId }) => docId.includes('http://doc.epam.com/'))).to.be.equal(true);
  });
});
