

const timestampToObj = (timestamp) => {

  let date = timestamp.slice(0, 10).split("-");
  let time = timestamp.slice(11, 16).split(":");

  let sig;
  if (Number(time[0] > 12)) {
    sig = "PM";
    time[0] = (Number(time[0]) - 12).toString();
  } else sig = "AM"


  return {
    year: date[0],
    month: date[1],
    day: date[2],
    hour: time[0],
    min: time[1],
    sig: sig,
    time: `${time[0]}:${time[1]} ${sig}`,
    date: date,
    date_time: date + `${time[0]}:${time[1]} ${sig}`
  }

}

const dateTimeStr = date => {

  const ordMatch = function (dayNum) {
    if (dayNum === 1) return "1st";
    if (dayNum === 2) return "2nd";
    if (dayNum === 3) return "3rd";
    if (dayNum > 3) return `${dayNum}th`
  };

  date = new Date(date);
  const dayNum = ordMatch(date.getDate());

  const options = {
    weekday: 'short', month: 'short', year: 'numeric'
  };

  return [`${dayNum} ${date.toLocaleString('en-US', options)}`,
    date.toLocaleTimeString('en-US')]

}

const timeDiff = (tsN, tsO) => {
  if (!(tsN instanceof Date)) tsN = new Date(tsN);
  if (!(tsO instanceof Date)) tsO = new Date(tsO);

  let res = (tsN - tsO) / 1000;

  return {
    days: Math.floor(res / 86400),
    hrs: Math.floor(res/ 3600),
    mins: Math.floor(res / 60),
    secs: Math.floor(res)
  }

};

// Component Helpers ------------
const scrollTo = (loc) => document.getElementById(loc)
  .scrollIntoView({ block: "end", behavior: "smooth" });

module.exports = {
  timestampToObj: timestampToObj,
  timeDiff: timeDiff,
  dateTimeStr: dateTimeStr,
  scrollTo: scrollTo
};



