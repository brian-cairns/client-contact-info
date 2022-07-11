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

function getServices() {
    let services = ''
    if (document.querySelector('input#autismSupport').isChecked) { services = services + "Autism-Support " }
    if (document.querySelector('input#tutoring').isChecked) { services = services + "Tutoring " };
    if (document.querySelector('input#ged').isChecked) { services = services + "GED " }
    if (document.querySelector('input#advocacy').isChecked) { services = services + "Special-Education-Advocacy " }
    if (document.querySelector('input#edConsult').isChecked) { services = services + "Educational-consultation " }
    if (document.querySelector('input#homeSchool').isChecked) { services = services + "Home/Virtual-School-Support " }
    if (document.querySelector('input#other').isChecked) {services = services + `other-${other-text}`}
    return services
}
  
let questions = document.querySelector('input#questions')
questions.addEventListener('change', (e) => {
    newForm.questions = e.target.value;
    console.log(newForm.questions)
})
    
document.getElementById('submit').addEventListener("click", async (event) => {
    const services = await getServices()
    newForm.services = services
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