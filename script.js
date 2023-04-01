const key = "API_KEY"
let conversa = [];

async function EDITE(text) {
  const response = await getResponse(text);
  const lines = response.split("\n"); // Divide o texto em linhas
  return lines
}

async function getResponse(text) {
  try {
    conversa.push({"role": "user","content": text});
    const response = await UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      payload: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": conversa,
        "temperature": 0.7,
      })
    });
    const data = JSON.parse(response.getContentText());
    return data.choices[0].message.content;
  } catch (e) {
    Logger.log(e)
  }
}

//Como criar KEY
//Acesse o site https://platform.openai.com/account/api-keys
//Depois inserir a KEY na const "key", da primeira linha desse código.
//No Google Sheets, acesse Extensões > Apps Script > e cole todo código e clique em salvar.
//Na planilha utilize a formula, =GPT("e sua pergunta").