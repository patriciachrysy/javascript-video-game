const boardUrl = "https://us-central1-js-capstone-backend.cloudfunctions.net/api/";

const gameId = 'e6juEoMf0ay4QWmVGfIp';

const saveScore = async (name, score) => {
    const data = {
        user: name,
        score: score
    };
    
    const postParams = {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(boardUrl + 'games/' + gameId +'/scores/', postParams);
    console.log(response.json());
}

const getScores = async () => {
    const getParams = {
        method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        }
    };
    const response = await fetch(boardUrl + 'games/' + gameId +'/scores/', getParams);
    const result = await response.json();
    return result.result;
}

export { saveScore, getScores }