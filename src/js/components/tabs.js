function disableElems(items){
  items.forEach(item => item.classList.remove('active'))
}

const tabs = (triggers, panes) => {
  const triggersArr = Array.from(document.querySelectorAll(triggers))
  const panesArr = Array.from(document.querySelectorAll(panes))

  triggersArr.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      disableElems(triggersArr);
      disableElems(panesArr);
      trigger.classList.add('active')
      panesArr[index].classList.add('active')
    })
  })
}

export default tabs;
