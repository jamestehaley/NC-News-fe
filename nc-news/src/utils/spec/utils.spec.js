const { secondsToTimeString, shortenNumbers } = require('../utils');
const { expect } = require('chai');
describe('secondsToTimeString', () => {
  it('returns 0 seconds when passed 0', () => {
    expect(secondsToTimeString(0)).to.equal('0 seconds');
  });
  it('returns 1 second when passed 1', () => {
    expect(secondsToTimeString(1)).to.equal('1 second');
  });
  it('returns X seconds for any number under 60', () => {
    expect(secondsToTimeString(59)).to.equal('59 seconds');
  });
  it('returns 1 minute when passed 60', () => {
    expect(secondsToTimeString(60)).to.equal('1 minute');
  });
  it('returns X minutes for any number between 60 and 3600', () => {
    expect(secondsToTimeString(3599)).to.equal('59 minutes');
  });
  it('returns the amount of the highest possible unit of time from second/minute/hour/day/year', () => {
    expect(secondsToTimeString(1222222222)).to.equal('38 years');
    expect(secondsToTimeString(122222222)).to.equal('3 years');
    expect(secondsToTimeString(12222222)).to.equal('141 days');
    expect(secondsToTimeString(1222222)).to.equal('14 days');
  });
});
describe('shortenNumbers', () => {
  it('returns a string of the number if passed a number under 1000', () => {
    expect(shortenNumbers(999)).to.equal('999');
  });
  it('returns the first 3 significant figures followed by K for any number between 1000 and 1000000', () => {
    expect(shortenNumbers(9999)).to.equal('9K');
  });
  it('returns the first 3 significant figures followed by M for any number over 1000000', () => {
    expect(shortenNumbers(99999999)).to.equal('99M');
  });
});
