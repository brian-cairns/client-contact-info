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
    
document.getElementById('submit').addEventListener("click", async (event) => {
    const services = await getServices()
    newForm.services = services
    console.log(newForm)
    submitForm(newForm, formName)
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
    .then((response) => {
      if (response.status == 200) {
      showSuccess()
      } else {
        showError(response.body)
      }
    })
    .catch((err) => showError(err))
}


function showSuccess() {
    document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
}

function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}