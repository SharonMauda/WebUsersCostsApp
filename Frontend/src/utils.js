export const URL =
  process.env.REACT_APP_ENV === "production"
    ? "https://costs-be.herokuapp.com"
    : "http://localhost:8080";
