const refreshBtn = document.querySelector('.refresh-btn')

const imageContainer = document.querySelector('.image-container')

const nameField = document.querySelector('#name')
const emailField = document.querySelector('#email')
const addressField = document.querySelector('#address')
const phoneField = document.querySelector('#phone')
const password = document.querySelector('#password')




function sendRequest(url) {
  return fetch(url).then(response => response.json())
    .catch(error => console.log(error))
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
  } catch (error) {
    console.log(error)
  }
}

refreshBtn.addEventListener('click', fetchUser)