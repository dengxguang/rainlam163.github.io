const app = new Vue({
  el: '#app',
  data: {
    list: [],
    colors: [
      '#f44336',
      '#e91e63',
      '#9c27b0',
      '#673ab7',
      '#3f51b5',
      '#2196f3',
      '#03a9f4',
      '#00bcd4',
      '#009688',
      '#4caf50',
      '#8bc34a',
      '#cddc39',
      '#ffeb3b',
      '#ffc107',
      '#ff9800',
      '#ff5722',
      '#795548',
      '#607d8b',
      '#9e9e9e'
    ]
  },
  computed: {
    today() {
      const today = new Date();
      return {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate()
      };
    },
    latestRepay() {
      let { day, name, bank } = { day: -1, name: '', bank: ''};
      if (this.list.length > 0) {
        const latestRepay = this.latestRepayInBank(this.list[0]);
        const restDays = (this.today.month < latestRepay.month ? getCurrentMonthDays() : latestRepay.day) - this.today.day;
        day = restDays;
      }
      this.list.forEach(item => {
        const latestRepay = this.latestRepayInBank(item);
        const restDays = (this.today.month < latestRepay.month ? getCurrentMonthDays() : latestRepay.day) - this.today.day;
        if (restDays < day) {
          day = restDays;
          name = latestRepay.name;
          bank = latestRepay.bank;
        }
      });
      return {
        name,
        day,
        bank
      };
    }
  },
  methods: {
    latestRepayInBank(bankData) {
      let {day, name} = {day: -1, name: ''};
      if (bankData.data.length > 0) {
        day = bankData.data[0].day;
      }
      bankData.data.forEach(item => {
        if (item.day < day && item.day >= this.today.day) {
          day = item.day;
          name = item.name;
        }
      });
      return { name, month: day < this.today.day ? this.today.month + 1 : this.today.month, day, bank: bankData.name };
    }
  },
  created() {
    shuffle(this.colors);
    this.list = data;
  }
});