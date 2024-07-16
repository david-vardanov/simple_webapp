const axios = require("axios");

(async () => {
  const pLimit = (await import("p-limit")).default;
  const limit = pLimit(100); // Ограничение одновременных запросов

  const sendRequest = async (index) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/users/balanceDecrease",
        null,
        {
          params: { userId: 1, amount: 2 },
        }
      );
      if (response.data.error) {
        return { success: false, message: response.data.error };
      }
      return { success: true };
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Insufficient funds"
      ) {
        return { success: false, message: "Insufficient funds" };
      }
      return { success: false, message: error.message };
    }
  };

  const test = async () => {
    const requests = [];
    for (let i = 0; i < 10000; i++) {
      requests.push(limit(() => sendRequest(i)));
    }
    const results = await Promise.all(requests);
    const successCount = results.filter((result) => result.success).length;
    const insufficientFundsCount = results.filter(
      (result) => result.message === "Insufficient funds"
    ).length;

    console.log("Test completed");
    console.log("Success:", successCount);
    console.log("Insufficient funds:", insufficientFundsCount);

    // Дополнительное логирование ошибок
    const errorMessages = results
      .filter((result) => !result.success)
      .map((result) => result.message);
    console.log("Error messages:", errorMessages.slice(0, 10)); // Показываем первые 10 ошибок для отладки
  };

  test();
})();
