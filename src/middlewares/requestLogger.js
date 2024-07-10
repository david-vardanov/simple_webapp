const fs = require("fs");
const path = require("path");

// Пути к директориям и файлам для логирования
const logDirectory = path.join(__dirname, "../../logs");
const logFilePath = path.join(logDirectory, "requests.log");
const statsFilePath = path.join(logDirectory, "stats.json");

// Проверка существования директории и создание, если не существует
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Инициализация статистики
let stats = { success: 0, insufficientFunds: 0, connectionErrors: 0 };

// Загрузка существующей статистики, если она есть
if (fs.existsSync(statsFilePath)) {
  try {
    const rawStats = fs.readFileSync(statsFilePath, "utf8");
    if (rawStats) {
      stats = JSON.parse(rawStats);
    }
  } catch (error) {
    console.error("Error reading stats file:", error);
  }
}

// Обновление статистики в зависимости от статуса ответа
const updateStats = (statusCode) => {
  if (statusCode === 200) {
    stats.success += 1;
  } else if (statusCode === 400 && stats.error === "Insufficient funds") {
    stats.insufficientFunds += 1;
  } else {
    stats.connectionErrors += 1;
  }
  fs.writeFileSync(statsFilePath, JSON.stringify(stats), "utf8");
};

// Middleware для логирования запросов
const requestLogger = (req, res, next) => {
  res.on("finish", () => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      headers: req.headers,
      statusCode: res.statusCode,
      responseMessage: res.statusMessage,
    };
    fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + "\n", "utf8");
    updateStats(res.statusCode);
  });
  next();
};

module.exports = requestLogger;
