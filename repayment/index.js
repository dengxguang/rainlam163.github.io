const app = new Vue({
  el: '#app',
  data: {
    list: [
      {
        name: '招商银行',
        data: [
          {
            name: '个人消费',
            day: 15
          },
          {
            name: '白金分期',
            day: 16
          }
        ]
      },
      {
        name: '平安银行',
        data: [
          {
            name: '个人消费',
            day: 1
          },
          {
            name: '白金分期',
            day: 4
          }
        ]
      },
      {
        name: '招商银行',
        data: [
          {
            name: '个人消费',
            day: 16
          },
          {
            name: '白金分期',
            day: 16
          }
        ]
      }
    ],
    colors: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b', '#9e9e9e']
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
    shuffle(a) {
      const len = a.length;
      for (let i = 0; i < len - 1; i++) {
        const index = parseInt(Math.random() * (len - i));
        const temp = a[index];
        a[index] = a[len - i - 1];
        a[len - i - 1] = temp;
      }
    },
    latestRepayInBank(bankData) {
      console.log(bankData);
      let {day, name} = {day: 31, name: ''};
      bankData.data.forEach(item => {
        if (item.day < day && item.day >= this.today.day) {
          day = item.day;
          name = item.name;
        }
      });
      return { name, day, bank: bankData.name };
    }
  },
  created() {
    this.shuffle(this.colors);
  }
});