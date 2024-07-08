const head = document.querySelector('head')

const backdrop = document.querySelector('.backdrop')
const modal = document.querySelector('.modal')
const modalBtn = document.getElementById('modal-btn')

const refreshBtn = document.getElementById('refresh-btn')

const imageContainer = document.querySelector('.image-container')

const nameField = document.getElementById('name')
const emailField = document.getElementById('email')
const addressField = document.getElementById('address')
const phoneField = document.getElementById('phone')
const password = document.getElementById('password')

let clickCounter = 0


async function sendRequest(url) {
  try {
    const response = await fetch(url)
    return await response.json()
  } catch (error) {
    return console.log(error)
  }
}

async function fetchUser() {
  try {
    const response = await sendRequest('https://randomuser.me/api/')
    const userData = response.results[0]
    const user = userData
    nameField.textContent = `Name: ${user.name.first}  ${user.name.last}` //poderia usar ${nameField.textContet} ${}
    emailField.textContent = `Email: ${user.email}`
    addressField.textContent = `Address: ${user.location.street.name} ${user.location.street.number} - ${user.location.state} ${user.location.country}`
    phoneField.textContent = `Phone: ${user.cell}`
    password.textContent = `Password: ${user.login.password}`
    const src = user.picture.large
    imageContainer.innerHTML =
      `
      <img class= "image" src="${src}">
      `
    const favicon = document.createElement('link')
    favicon.rel = 'icon'
    favicon.type = 'image/x-icon'
    favicon.href = src
    // const favicon = document.createElement(`<link rel="icon" type="image/x-icon" href="${src}"`)
    head.appendChild(favicon)
  } catch (error) {
    console.log(error)
  }
}

refreshBtn.addEventListener('click', fetchUser)
refreshBtn.addEventListener('click', clickAccount)

function clickAccount() {
  clickCounter++
  if(clickCounter == 10) {
    backdrop.classList.toggle('open')
    modal.classList.toggle('open')
  } else if (clickCounter == 20) {
    refreshBtn.removeEventListener('click', fetchUser)
  }
}

modalBtn.addEventListener('click', () => {
  backdrop.classList.toggle('open')
  modal.classList.toggle('open')
})

