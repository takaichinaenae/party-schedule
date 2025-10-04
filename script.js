function toggleDetail(element) {
  const detail = element.querySelector('.detail');
  if (detail) {
    detail.classList.toggle('active');
  }
}
const fee = 3500;

// チェック状態を保存
function saveCheckboxState() {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((cb, index) => {
    localStorage.setItem(`checkbox-${index}`, cb.checked);
  });
}

// チェック状態を復元
function restoreCheckboxState() {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((cb, index) => {
    const saved = localStorage.getItem(`checkbox-${index}`);
    cb.checked = saved === "true";
  });
}

// 合計・小計を更新
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

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  restoreCheckboxState();
  updateTotals();

  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      saveCheckboxState();
      updateTotals();
    });
  });
});
document.getElementById('reset-button').addEventListener('click', () => {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach(cb => cb.checked = false);
  localStorage.clear(); // 保存されたチェック状態もリセット
  updateTotals(); // 金額も更新
});
