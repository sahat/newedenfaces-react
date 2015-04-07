module.exports = {
  database: process.env.DATABASE || 'localhost:27017',
  sendgrid: {
    username:  process.env.SENDGRID_USERNAME || 'airpair_sahat',
    password: process.env.SENDGRID_PASSWORD || 'airpair2'
  }
};