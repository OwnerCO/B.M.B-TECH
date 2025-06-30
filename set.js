const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU015SlB6bG9IdHI0YlFtYWgyTll3VU9RWkp3RHdKdWxTQTlvQjF4eGRVQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1Z0UytZK2VOM040SUpSL3hhVVo3ZmxRbEhaenFOQkVPQW1pd01MZncyND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4SkhsbklvZFpVN2FoUE5PYnc4dkdhYXkvZXl2VVN4SDh1dU0yMC9EZDAwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjWkZoM0VUVDdWaFZwV1NLQ0kxWFFXRDgwZDdZb2RXVjVtOTJ1Wlo2b1JrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVNTlUvM0xhMEtBYlhlUzVQRE1DQUZhcEdRQ21kSEhaU2hidWh4WElaSHM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InV5ZGNUQ0xRcElHQUVZOGFnbnlHdU9PNWtTbGRxM2RMT1Q1NzZ2RG5nWEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUZyQ29oVjZZeFZPZzJYMjQ1NVdIT1dIWUtORS9nWUQ5SXg2QXF0QUZsVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRkYxUmRua3JxOVNrSHNJbDlzQjhlWWxWd3daVGk3UGc3NnJ5d1ZIbFBCcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikt5TnBtVGRNNks3SCtoN2VZK1BqQnM1aGFJZjAwZUwySlZBeGViRXpzaHZLUnZWNEpuWW5ia0FXWTFnTmlacEE1NUJEUWdabi9tQmlqdjdCMXVXVWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc0LCJhZHZTZWNyZXRLZXkiOiJVUEtsOFY3cXZYMWJoNEkwdkM3VkhqSVhaaFBJTmFMOXVUVkgvNGJmMlNZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkJEMTcwQTgxQUE1MjU5NTRDNzY3MDQzMjMzMzg4MjAxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEzMDA3OTZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNGN0RGQ0NDMkNFQkI2M0NFOUVCOUJEMzI0RThFREQ4In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEzMDA3OTh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjUxOTQxODQ3NDY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkYxMEJGRjc0MzAzNzRDMjIyNkI4ODY0RDVBM0NEM0NGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTEzMDA4MDh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkVMUlRGUTdEIiwibWUiOnsiaWQiOiI1MTk0MTg0NzQ2NToxMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJTeXNzb2x1dGlvbnMiLCJsaWQiOiI1NTczNjQyODE4Nzc0NDoxMEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xIazJQMERFSy8xaXNNR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InpnWE9XYmpSM09mTWplWDgyeWJEYXdqTVFuQmxEZjZTdEIvbDkrWjBzRHM9IiwiYWNjb3VudFNpZ25hdHVyZSI6Img3bnNwR1JiK3dDMVVlbDZyZHZhYTBtM2ZMamQwTjAwL1FrM0tmUlMwR2taSUhydXpHdTF1cHorTGgvSE5DcjloMTF5WGQ0ck5tVFpFSGRXSFA5bUNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJtbURhSnpoVEE4d3NtWTNVNHF0eDAxNGJtUDl1Tkt1d2l1aDIyeGQxQWpoa2o0QjZaVldsdmxKZXl0R2F2aWhQOEtmNXBFYlRsQzJVY2M5SHgxVHFqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjUxOTQxODQ3NDY1OjEwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmM0RnpsbTQwZHpuekkzbC9Oc213MnNJekVKd1pRMytrclFmNWZmbWRMQTcifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MTMwMDc5NSwibGFzdFByb3BIYXNoIjoiUFdrNUIiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdWMCJ9',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "SYSSOLUTIONS",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "SYSSOLUTIONS",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'SYSSOLYTIONS',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

