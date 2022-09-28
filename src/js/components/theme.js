const theme = () => {
  const button = document.querySelector('.js-theme')
  const html = document.documentElement

  if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark')
  } else {
    html.setAttribute('data-theme', 'light')
  }

  button.addEventListener('click', function() {
    if(html.dataset.theme === 'light') {
      html.setAttribute('data-theme', 'dark')
    } else {
      html.setAttribute('data-theme', 'light')
    }
  })
}

export default theme
