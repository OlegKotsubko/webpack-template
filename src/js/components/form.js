function setError(item, text) {
  const err = item.parentNode.querySelector('.js-input-error')
  item.classList.add('input-error')

  err.innerHTML = text
}

function clearError(item) {
  const err = item.parentNode.querySelector('.js-input-error')
  item.classList.remove('input-error')

  err.innerHTML = ''
}

const form = () => {
  const block = document.getElementById('form-block')
  const success = document.getElementById('form-success')
  const form = document.getElementById('form')
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const checkbox = document.getElementById('checkbox')
  const submit = document.getElementById('submit')

  name.addEventListener('input', () => clearError(name))
  email.addEventListener('input', () => clearError(email))
  checkbox.addEventListener('input', () => clearError(checkbox))

  const emailRegexApp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if(!emailRegexApp.test(String(email.value).toLowerCase())) {
      setError(email, 'Please write correct email example@gmail.com')
    }

    if(name.value.length < 2) {
      setError(name, 'Please write more than 2 chars')
    }

    if(!checkbox.checked) {
      setError(checkbox, 'Please confirm this rules')
    }

    if(this.querySelectorAll('.input-error').length === 0) {
      submit.innerText = 'Sending data...'
      setTimeout(()=> {
        this.reset()
        block.style.display = "none"
        success.style.display = "block"
      }, 3000)
    }
  })
}

export default form
