const app = new Vue({
  el: '#app',
  data: {
    people: [],
    showForm: false,
    showDeleteDlg: false,
    showBottomOpr: false,
    form: {
      name: '',
      money: 0
    },
    db: null,
    mode: 'CREATE',
    timeoutEvent: 0,
    selectItem: {}
  },
  computed: {
    deleteTitle() {
      return `确定删除 ${this.selectItem.name} 的记录吗？`
    }
  },
  methods: {
    handleCreate() {
      this.mode = 'CREATE';
      this.showForm = true;
    },
    handleCancel() {
      this.resetForm();
      this.showForm = false;
    },
    handleConfirm() {
      switch (this.mode) {
        case 'CREATE':
          db.person.add(this.form).then(() => {
            db.person.toArray(array => {
              this.people = array;
              this.showForm = false;
              this.resetForm();
            });
          });
        break;
        case 'UPDATE':
          db.person.update(this.form.id, { name: this.form.name, money: this.form.money }).then(() => {
            db.person.toArray(array => {
              this.people = array;
              this.showForm = false;
              this.showBottomOpr = false;
              this.resetForm();
            });
          });
        break;
      }
    },
    resetForm() {
      this.form = {
        name: '',
        money: 0
      }
    },
    handleTouchStart(e, person) {
      this.timeoutEvent = setTimeout(() => {
        this.timeoutEvent = 0;
        this.selectItem = person;
        this.showBottomOpr = true;
      }, 500);
      e.preventDefault();
    },
    handleTouchMove() {
      clearTimeout(this.timeoutEvent);
      this.timeoutEvent = 0;
    },
    handleTouchEnd() {
      clearTimeout(this.timeoutEvent);
      return false;
    },
    handleConfirmDelete() {
      db.person.delete(this.selectItem.id).then(() => {
        db.person.toArray(array => {
          this.people = array;
          this.selectItem = {};
          this.showDeleteDlg = false;
          this.showBottomOpr = false;
        });
      });
    },
    handleUpdateOrDelete({value}) {
      switch (value) {
        case 'UPDATE':
          this.mode = 'UPDATE'
          this.form = JSON.parse(JSON.stringify(this.selectItem));
          this.showForm = true;
        break;
        case 'DELETE':
          this.showDeleteDlg = true;
        break;
      }
    }
  },
  mounted() {
    db = new Dexie("cashbook");
    db.version(1).stores({
        person: '++id, name, money'
    });
    db.person.toArray(array => {
      this.people = array;
    });
  }
})