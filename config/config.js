const PASS = process.env.GMAIL_APPPASS;
const Config = {
  SMTP: {
    HOST: "smtp.gmail.com", //mailtrap user garne
    PORT: 465,
    USER: "pumpkintown786@gmail.com",
    PASS: PASS,
    FROM: "pumpkintown786@gmail.com",
    TLS: true,
  },
  DB: {
    PROTOCOL: "mongodb",
    HOST: "localhost",
    NAME: "ecom1month",
    USER: "",
    PWD: "",
    PORT: 27017,
  },
};
module.exports = Config;
