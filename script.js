function toggleDetail(element) {
  const detail = element.querySelector('.detail');
  if (detail) {
    detail.classList.toggle('active');
  }
}
const fee = 3500;

function updateTotals() {
  let total = 0;
  [4, 3, 2, 1].forEach(year => {
    const checkboxes = document.querySelectorAll(`.grade-${year}`);
    const count = Array.from(checkboxes).filter(cb => cb.checked).length;
    const subtotal = count * fee;
    document.getElementById(`subtotal-${year}`).textContent = `小計：${subtotal.toLocaleString()}円`;
    total += subtotal;
  });
  document.getElementById('total').textContent = `合計：${total.toLocaleString()}円`;
}

document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', updateTotals);
});
