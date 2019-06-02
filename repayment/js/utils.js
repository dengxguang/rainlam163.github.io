const shuffle = a => {
  const len = a.length;
  for (let i = 0; i < len - 1; i++) {
    const index = parseInt(Math.random() * (len - i));
    const temp = a[index];
    a[index] = a[len - i - 1];
    a[len - i - 1] = temp;
  }
}

const getCurrentMonthDays = () => {
  var curDate = new Date();
  var curMonth = curDate.getMonth();
  curDate.setMonth(curMonth + 1);
  curDate.setDate(0);
  return curDate.getDate();
}