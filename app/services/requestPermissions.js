import { Permissions, Notifications } from "expo";

export const cameraAccess = async () => {
  const { status } = await Permissions.getAsync(Permissions.CAMERA);

  if (status !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      return;
    }
  }
};

export const registerPushNotification = async () => {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

  if (status !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      return;
    }
  }

  const token = await Notifications.getExpoPushTokenAsync();
  return token;
};
