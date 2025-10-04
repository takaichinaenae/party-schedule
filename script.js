function toggleDetail(element) {
  const detail = element.querySelector('.detail');
  if (detail) {
    detail.classList.toggle('active');
  }
}
const fee = 3500;
const goal = 164500;

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
    document.getElementById(`subtotal-${year}`).textContent = `計：${subtotal.toLocaleString()}円`;
    total += subtotal;
  });

  document.getElementById('total').textContent = `合計：${total.toLocaleString()}円`;

  const remaining = Math.max(goal - total, 0); // マイナスにならないように
  document.getElementById('remaining').textContent = `残り：${remaining.toLocaleString()}円`;
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
document.getElementById("reset-button").addEventListener("click", function () {
  const confirmReset = confirm("本当にリセットしますか？");
  if (confirmReset) {
    // すべてのチェックを外す処理
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => cb.checked = false);

    // 小計・合計・残り金額の表示をリセット
    document.getElementById("subtotal-1").textContent = "計：0円";
    document.getElementById("subtotal-2").textContent = "計：0円";
    document.getElementById("subtotal-3").textContent = "計：0円";
    document.getElementById("subtotal-4").textContent = "計：0円";
    document.getElementById("total").textContent = "合計：0円";
    document.getElementById("remaining").textContent = "あと：164,500円"; 
  }
});
