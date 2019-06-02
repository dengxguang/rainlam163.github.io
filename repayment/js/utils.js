const shuffle = a => {
  const len = a.length;
  for (let i = 0; i < len - 1; i++) {
    const index = parseInt(Math.random() * (len - i));
    const temp = a[index];
    a[index] = a[len - i - 1];
    a[len - i - 1] = temp;
  }
}