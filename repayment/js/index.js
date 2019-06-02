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
      let { day, name, bank } = { day: 31, name: '', bank: '' };
      this.list.forEach(item => {
        const latestRepay = this.latestRepayInBank(item);
        if (latestRepay.day < day) {
          day = latestRepay.day;
          name = latestRepay.name;
          bank = latestRepay.bank;
        }
      });
      return {
        name,
        days: day - this.today.day,
        bank
      };
    }
  },
  methods: {
    latestRepayInBank(bankData) {
      let {day, name} = {day: 0, name: ''};
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