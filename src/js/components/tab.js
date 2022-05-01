function resetItem(items) {
  items.forEach(item => {
    item.classList.remove('is-active')
  })
}

const tab = () => {
  const tabs = document.querySelectorAll('.js-tab')

  if(!tabs) return;

  tabs.forEach(tab => {
    const triggers = tab.querySelectorAll('.js-tab-trigger');
    const contents = tab.querySelectorAll('.js-tab-item')
    if(!triggers) return;

    triggers.forEach(trigger => {
      trigger.addEventListener('click', function (){
        const id = this.dataset.target
        resetItem(triggers)
        resetItem(contents)

        document.getElementById(id).classList.add('is-active')
        document.querySelectorAll(`[data-target=${id}]`).forEach(trigger => {
          trigger.classList.add('is-active')
        })
      })
    })
  })
}

export default tab
