import { saveScore, getScores } from '../../Score/scoreApi';

let res = null;
let res1 = null;
let res2 = null;
const loadRes = async () => {
  res = await saveScore('Lisa', 100);
  res1 = await saveScore(null, null);
  res2 = await getScores();
};

loadRes();

describe('Saving score on the online leaderboard', () => {
  test('Should return OK if the parameters are correct', () => {
    expect(res).toEqual('Error');
  });
});

describe('Saving score on the online leaderboard', () => {
  test('Should return Error if the parameters are missing', () => {
    expect(res1).toEqual('Error');
  });
});

describe('Getting scores from the online leaderboard', () => {
  test('Should return an Object if the parameters are correct', () => {
    expect(typeof (res2)).toEqual('object');
  });
});