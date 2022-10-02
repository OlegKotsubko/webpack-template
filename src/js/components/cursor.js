const cursor = () => {
  const cursor = document.querySelector('.js-cursor');

  const handleCursor = (e) => {
    const { clientX: x, clientY: y } = e;
    cursor.style.cssText =`left: ${x}px; top: ${y}px;`;
  }

  window.addEventListener('mousemove', handleCursor);
}

export default cursor
