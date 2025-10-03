function toggleDetail(element) {
  const detail = element.querySelector('.detail');
  if (detail) {
    detail.style.display = (detail.style.display === 'block') ? 'none' : 'block';
  }
}
