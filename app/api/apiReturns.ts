export const errorStatus = (message: string) => {
  if (message.startsWith("Unauthorized")) {
    return 401;
  }
  return 500;
};
