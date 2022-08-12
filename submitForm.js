let submit = document.getElementById('submit')
console.log(submit)
const formName = 'clientContactInfo'
console.log('form: ' + formName)
let newForm = {}

let clientName = document.querySelector('input#clientName')
clientName.addEventListener('change', (e) => {
	console.log('changed')
	newForm.clientName = e.target.value;
  console.log(newForm.clientName);
  })
  
let email = document.querySelector('input#email')
email.addEventListener('change', (e) => {
	newForm.email = e.target.value;
  console.log(newForm.email);
})

let address = document.querySelector('input#address')
address.addEventListener('change', (e) => {
	newForm.address = e.target.value;
  console.log(newForm.address);
})

let city = document.querySelector('input#city')
city.addEventListener('change', (e) => {
	newForm.city = e.target.value;
  console.log(newForm.city);
})

let state = document.querySelector('input#state')
state.addEventListener('change', (e) => {
	newForm.state = e.target.value;
  console.log(newForm.state);
})

let zip = document.querySelector('input#zip')
zip.addEventListener('change', (e) => {
	newForm.zip = e.target.value;
  console.log(newForm.zip);
})

let phone = document.querySelector('input#phone')
phone.addEventListener('change', (e) => {
	newForm.phone = e.target.value;
  console.log(newForm.phone);
})

let emergencyContactName = document.querySelector('input#emergencyContactName')
emergencyContactName.addEventListener('change', (e) => {
	newForm.emergencyContactName = e.target.value;
  console.log(newForm.emergencyContactName);
})

let emergencyContactPhone = document.querySelector('input#emergencyContactPhone')
emergencyContactPhone.addEventListener('change', (e) => {
	newForm.emergencyContactPhone = e.target.value;
  console.log(newForm.emergencyContactPhone);
})

async function getServices () {
  let services = new Promise((res) => { 
    let request = '' 
    if (document.querySelector('input#autismSupport').checked) { request = request + "Autism-Support " }
    if (document.querySelector('input#tutoring').checked) { request = request + "Tutoring " };
    if (document.querySelector('input#ged').checked) { request = request + "GED " }
    if (document.querySelector('input#advocacy').checked) { request = request + "Special-Education-Advocacy " }
    if (document.querySelector('input#edConsult').checked) { request = request + "Educational-consultation " }
    if (document.querySelector('input#homeSchool').checked) { request = request + "Home/Virtual-School-Support " }
    if (document.querySelector('input#other').checked) {request = request + `other-${otherText}`}
    res(request)
  })
  return services  
}
  
let questions = document.getElementById('questions')
questions.addEventListener('change', (e) => {
    newForm.questions = e.target.value;
    console.log(newForm.questions)
})

let printForm = document.getElementById('printToPDF')
printForm.style.display = 'none'
    
document.getElementById('submit').addEventListener("click", async (event) => {
    const services = await getServices()
    newForm.services = services
    console.log(newForm)
  submitForm(newForm, formName)
    .then(() => postNotices(newForm.clientName))
    .then(() => createClientRecord(newForm))   
    .catch(console.error)
  
})

async function submitForm(data, form) {
  const document = {
    'form': form,
    'data': data
  }
  console.log(document)
  fetch('https://pffm.azurewebsites.net/form', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then(response => response.json())
    .then(data => respond(data)) 
    .catch((err) => showError(err))
}

function respond(data) {
  let id = data.key
  if (id) {
    showSuccess(id) 
  } else {
    showError(data.error)
  }
}

function showSuccess(id) {
  document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
  printForm.style.display = 'inline';
  printForm.addEventListener('click', (e) => { window.print() })
  let ref = `phoenix-freedom-foundation-backend.webflow.io/client-portal?${newForm.clientName}`
  let link = `<a href = ${ref}>contact form</a>`
  let message = `a new client has submitted ${link}`
  notify('admin', message, 'general')
}


function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}

async function createClientRecord(data) {
  fetch('https://pffm.azurewebsites.net/newClient', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(data)
  })
}  

async function postNotices(user) {
  console.log(user)
  console.log(clientName)
  const url = 'https://pffm.azurewebsites.net/notices'
  const notices = [
    'Complete the <a href="/forms/new-client-intake-form">Client Intake Form</a>',
    'Complete the <br/><a href="/forms/release-of-liability-form">Release of Liability Form</a>',
    'Complete the <br/><a href="/forms/autism-support-services-service-agreement-form">Service Agreement Form</a>',
    'Complete the <br /><a href="/forms/payment-agreement-form">Payment Agreement Form</a>'
  ]

  let header = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  } 

  for (let i = 0; i < 4; i++) {
    let data = {
      name: user,
      notice: notices[i]
    }
    let params = {
      method: "POST",
      headers: header,
      body: JSON.stringify(data)
    }
    await fetchUrl(url, params)
  }
}

async function fetchUrl(url, params) {
  return fetch(url, params)
}

