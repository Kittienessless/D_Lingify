const axios = require("axios");

require("dotenv").config();
const qs = require("qs");
const prompt = require("./prompt.js");

class Api {
  systemPromptTranslation = prompt.systemPromptTranslation;
  systemPromptGenericText = prompt.systemPromptGenericText;
  systemPromptCreateLanguage = prompt.systemPromptCreateLanguage;
  answerExample = prompt.answerExample;
  
  GigaChatModel = "model: GigaChat-2-Max";


  get Create() {
    return this.systemPromptCreateLanguage;
  }
  get Translate() {
    return this.systemPromptTranslation;
  }
  get Generate() {
    return this.systemPromptGenericText;
  }
  get GigaChatModel() {
    return this.GigaChatModel;
  }

  async getAccessToken(RqUID) {
    let data = qs.stringify({
      scope: "GIGACHAT_API_PERS",
    });

    let configGetToken = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        RqUID: RqUID,
        Authorization: `Basic ${process.env.GIGACHAT_AUTH_KEY}`,
      },
      data: data,
    };

    const token = await axios
      .request(configGetToken)
      .then((response) => {
        const access_token = JSON.stringify(response.data);
        return access_token;
      })
      .catch((error) => {
        console.log(error);
      });

    return token;
  }

  async getConfig(bearer, data) {
    return (configApi = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${bearer}`,
      },
      data: data,
    });
  }

  async postApi(bearer, data) {
    let config = this.getConfig(bearer, data);
    const chatResponse = await axios
      .request(config)
      .then((response) => {
        const answer = JSON.stringify(response.data);
        return answer;
      })
      .catch((error) => {
        console.log(error);
      });
    return chatResponse;
  }
}

module.exports = new Api();
