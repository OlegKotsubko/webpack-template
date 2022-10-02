const copyright = {
  en: {
    hero: {
      first: 'WE HELP',
      second: 'interpret',
      third: 'YOUR IDEAS',
      fourth: 'through design',
    },
    contact: {
      first: 'KEEP IN TOUCH'
    },
    footer: {
      copy: 'All Rights Reserved.'
    }
  },
  uk: {
    hero: {
      first: 'Ми допоможемо',
      second: 'перетворити',
      third: 'ваші ідеі',
      fourth: 'у дизайн',
    },
    contact: {
      first: 'на зв\'язку'
    },
    footer: {
      copy: 'Усі права захищені'
    }
  }
}

const language = () => {
  const triggers = document.querySelectorAll('.js-lang-country-trigger')
  const title = document.querySelector('.js-lang-country')
  const root = document.documentElement

  triggers.forEach(trigger => {
    trigger.addEventListener('click', function (){
      const lang = this.dataset.lang
      root.setAttribute('lang', lang)
      root.click()
      title.innerHTML = lang

      Object.entries(copyright[lang]).forEach(([key, value]) => {
        if(!!(value && typeof value === "object" && !Array.isArray(value))) {
          Object.entries(value).forEach(([k, v]) => {
            if(document.querySelector(`[data-${key}-${k}]`)) {
              document.querySelector(`[data-${key}-${k}]`).innerText = v
            }
          })
        }
      })
    })
  })
}

export default language;
