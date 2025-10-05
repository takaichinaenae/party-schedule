function toggleDetail(element) {
  const detail = element.querySelector('.detail');
  if (detail) {
    detail.classList.toggle('active');
  }
}
const fee = 3500;
const goal = 164500;


function saveCheckboxState() {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((cb, index) => {
    localStorage.setItem(`checkbox-${index}`, cb.checked);
  });
}


function restoreCheckboxState() {
  const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  allCheckboxes.forEach((cb, index) => {
    const saved = localStorage.getItem(`checkbox-${index}`);
    cb.checked = saved === "true";
  });
}


function updateTotals() {
  let total = 0;
  [4, 3, 2, 1].forEach(year => {
    const checkboxes = document.querySelectorAll(`.grade-${year}`);
    const count = Array.from(checkboxes).filter(cb => cb.checked).length;
    const subtotal = count * fee;
    document.getElementById(`subtotal-${year}`).textContent = `計：${subtotal.toLocaleString()}円`;
    total += subtotal;
  });

  document.getElementById('total').textContent = `合計：${total.toLocaleString()}円`;

  const remaining = Math.max(goal - total, 0); 
  document.getElementById('remaining').textContent = `残り：${remaining.toLocaleString()}円`;
}



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
document.getElementById("reset-button").addEventListener("click", function () {
  const confirmReset = confirm("本当にリセットしますか？");
  if (confirmReset) {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((cb, index) => {
      cb.checked = false;
      localStorage.removeItem(`checkbox-${index}`); // ← 保存された状態も削除！
    });

    document.getElementById("subtotal-1").textContent = "計：0円";
    document.getElementById("subtotal-2").textContent = "計：0円";
    document.getElementById("subtotal-3").textContent = "計：0円";
    document.getElementById("subtotal-4").textContent = "計：0円";
    document.getElementById("total").textContent = "合計：0円";
    document.getElementById("remaining").textContent = "残り：164,500円";
  }
});
