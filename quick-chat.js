const prompt = require('prompt');
const fs = require('fs');
const yaml = require('yaml');
const axios = require('axios');
prompt.start();

async function getApiKey() {
  if (!fs.existsSync('./api.yaml')) {
    const { apiKey } = await prompt.get([{
      name: 'apiKey',
      hidden: true,
      description: 'Enter your API key:'
    }]);

    const data = {
      apiKey: apiKey,
    };

    fs.writeFileSync('./api.yaml', yaml.stringify(data));
  }

  const data = yaml.parse(fs.readFileSync('./api.yaml'));
  return data.apiKey;
}

async function callApi() {
  const apiKey = await getApiKey();

  try {
    const response = await axios.get('https://api.example.com/', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log(response.data);
  } catch(error) {
    console.error(error);
  }
}

callApi();
