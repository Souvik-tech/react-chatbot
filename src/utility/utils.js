import { toast, Bounce } from "react-toastify";

export const formateDate = (timestamp) => {
  const date = new Date(timestamp);
  let dt = date.getDate();

  if (dt < 10) dt = "0" + dt;

  let month = date.getMonth() + 1; //to make the month 1 based

  if (month < 10) month = "0" + month;

  const dateString = dt + "-" + month + "-" + date.getFullYear();

  return dateString;
};

export function getRelativeDate(date) {
  const [givenDay, givenMonth, givenYear] = date.split("-");
  const [day, month, year] = formateDate(Date.now()).split("-");

  if (year !== givenYear) return date;
  if (month !== givenMonth) return month;

  if (day === givenDay) return "Today";
  if (parseInt(day) === parseInt(givenDay) + 1) return "Yesterday";
}

export function formatTime(timestamp) {
  const time = new Date(timestamp);

  let hrs = time.getHours();
  if (hrs < 10) hrs = "0" + hrs;

  let min = time.getMinutes();
  if (min < 10) min = "0" + min;

  return `${hrs}:${min}`;
}

export function toastInfo(text) {
  toast.info(text, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });
}
