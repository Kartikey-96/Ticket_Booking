export const formatDate = (dateString, showTime = true) => {
  const date = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // Use 24-hour format
  };
  const time = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  let options = { ...date };
  if (showTime) {
    options = { ...date, ...time };
  }

  return new Date(dateString).toLocaleDateString("en-US", options);
};
