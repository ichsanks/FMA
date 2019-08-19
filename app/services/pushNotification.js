export const sendPushNotification = (to, title, body, code) => {
  return fetch("https://exp.host/--/api/v2/push/send", {
    body: JSON.stringify({
      to,
      title,
      body,
      data: { code },
      channelId: "fma"
    }),
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate",
      "Content-Type": "application/json"
    },
    method: "POST"
  });
};
