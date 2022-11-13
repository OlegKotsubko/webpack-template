const cursor = () => {
  const cursor = document.querySelector('.js-cursor');

  const handleCursor = (e) => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left =`${x - (cursor.offsetWidth / 2)}px`;
    cursor.style.top =`${y - (cursor.offsetHeight / 2)}px`;
  }

  window.addEventListener('mousemove', handleCursor);
}

export default cursor
