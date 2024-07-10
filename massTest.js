const axios = require("axios");
const fs = require("fs");
const path = require("path");

const USER_ID = 1;
const AMOUNT = 2;
const REQUESTS = 10000;
const THREADS = 1000; // Количество параллельных запросов в один момент
const LOG_FILE = path.join(__dirname, "logs/logs.json");
const STATS_FILE = path.join(__dirname, "logs/stats.json");

let successCount = 0;
let insufficientFundsCount = 0;

// Убедитесь, что лог файл и файл статистики существуют
fs.writeFileSync(LOG_FILE, "");
fs.writeFileSync(STATS_FILE, "");

const sendRequest = async () => {
  try {
    const response = await axios.put(
      `http://localhost:3000/users/balanceDecrease`,
      null,
      {
        params: {
          userId: USER_ID,
          amount: AMOUNT,
        },
      }
    );
    if (response.status === 200) {
      successCount++;
    }
    const logEntry = {
      timestamp: new Date().toISOString(),
      responseCode: response.status,
    };
    fs.appendFileSync(LOG_FILE, JSON.stringify(logEntry) + "\n", "utf8");
  } catch (error) {
    if (error.response && error.response.status === 400) {
      insufficientFundsCount++;
    }
    const logEntry = {
      timestamp: new Date().toISOString(),
      responseCode: error.response ? error.response.status : 500,
    };
    fs.appendFileSync(LOG_FILE, JSON.stringify(logEntry) + "\n", "utf8");
  }
};

const test = async () => {
  const pLimit = (await import("p-limit")).default;
  const limit = pLimit(THREADS);
  const promises = Array.from({ length: REQUESTS }, () => limit(sendRequest));

  await Promise.all(promises);

  const stats = {
    success: successCount,
    insufficientFunds: insufficientFundsCount,
  };
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats), "utf8");

  console.log("Test completed");
  console.log("Success:", successCount);
  console.log("Insufficient funds:", insufficientFundsCount);
};

test().catch((err) => {
  console.error("Error during test:", err);
});
