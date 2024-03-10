const navItems = document.querySelectorAll('.nav-item')

const sections = {
    home: document.getElementById('home'),
    toManage: document.getElementById('toManage'),
    register: document.getElementById('register'),
    employees: document.getElementById('employees')
}

const form = document.getElementById('form')

const data = []
console.log(data)

let lastCity = ''


// Classes -----------------------------------------------------------------------------------------------------------------

class Employeer {
    constructor(name, age, office,) {
        this.name = name
        this.age = age
        this.office = office
    }

    introduceYourself() {
        alertBox(`Olá, meu nome é ${this.name}, tenho ${this.age}`)
    }
    toWork() {
        alertBox(`${this.name} iníciou sua atividade de trabalho!`)
    }
}

class Developer extends Employeer {
    constructor(name, age, office, language) {
        super(name, age, office)
        this.language = language
    }
    program() {
        alertBox(`${this.name} deu início ao desenvolvimento!`)
    }
}

class Manager extends Employeer {
    constructor(name, age, office, department) {
        super(name, age, office)
        this.department = department
    }
    toManage() {
        alertBox(`${this.name} está gerenciando o seu departamento!`)
    }
}





// Consumindo uma API weather --------------------------------------------------------------------------

async function getWeather(city) {

    const apiKey = '666dc51e28def436bc5eb92351f12c3d'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const result = await fetch(url)
    .then(res => res.json())
    .then(data => data)
    .catch(err => alertBox(err))

    return result
}





// Adicionando Botão ativo na barra lateral de navegação -----------------------------------------------------------------

function navItemActive() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(item => {
                item.classList.remove('active')
                item.children[1].classList.remove('activeColor')
            })
            item.classList.toggle('active')
            item.children[1].classList.toggle('activeColor')
        })
    })
}





// Remover sessões renderizadas -----------------------------------------------------------------------------------------

function removeRender() {
    navItems.forEach(navItem => {
        navItem.addEventListener('click', () => {
            document.querySelectorAll('section').forEach(section => {
                section.classList = 'hidden'
                if(section.innerHTML !== '') {
                    section.innerHTML = ''
                }
            })
        })
    })
}





// Caixa de Alerta ------------------------------------------------------------------------------------------------------

function removeAlertBox() {
    const alertBox = document.getElementById('alertBox');
    if (alertBox) {
        alertBox.remove();
    }
}

function alertBox(message) {

    const box = document.createElement('div')
    box.id = 'alertBox'
    box.classList = 'alertBox'
    box.textContent = message

    const btn = document.createElement('button')
    btn.id = 'alertBox-btn'
    btn.classList = 'alertBox-btn'
    btn.textContent = 'OK'

    btn.addEventListener('click', () => {
        removeAlertBox()
    })

    box.appendChild(btn)
    document.querySelector('body').appendChild(box)
}





// Criação da pagina inicial

function home() {
    
    const div1 = document.createElement('div')
    div1.classList = 'div1'
    const div2 = document.createElement('div')
    div2.classList = 'div2'

    const time = document.createElement('div')
    time.id = 'time'
    time.classList = 'time'

    const date = document.createElement('div')
    date.classList = 'date'

    const day = document.createElement('div')
    day.id = 'day'
    day.classList = 'day'

    const week = document.createElement('div')
    week.id = 'week'
    week.classList = 'week'

    const hours = document.createElement('div')
    hours.id = 'hours'
    hours.classList = 'hours'

    const registered = document.createElement('div')
    registered.id = 'registered'
    registered.classList = 'registered'
    registered.textContent = 'Funcionários Registrados'


    const weather = document.createElement('div')
    weather.id = 'weather'
    weather.classList = 'weather'

    const search = document.createElement('div')
    search.id = 'search'
    search.innerHTML = '<span class="material-symbols-outlined">search</span>'

    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'searchInput'
    input.classList = 'hidden'

    const title = document.createElement('div')
    title.id = 'title'
    title.classList= 'title'
    title.textContent = 'Weather'

    const local = document.createElement('div')
    local.id = 'local'
    local.classList= 'hidden'

    const img = document.createElement('img')
    img.id = 'img'
    img.classList = 'img'
    img.src = 'img/weather/sol.png'

    const temperature = document.createElement('div')
    temperature.id = 'temperature'
    temperature.classList = 'temperature'
    temperature.innerHTML = `<span>Temperatura</span>
        <span id="degrees"></span>`

    date.append(day, week)
    time.append(date, hours)
    div1.append(time, registered)
    weather.append(search, input, title, local, img, temperature)
    div2.append(weather)

    sections.home.append(div1, div2)

}

async function weather(city) {

    const weather = await getWeather(city)

    const local = document.getElementById('local')
    const img = document.getElementById('img')
    const temperature = document.getElementById('degrees')

    const condition = weather.weather[0].main
    const degrees = parseFloat(weather.main.temp) - 273.15 

    local.textContent = weather.name
    temperature.textContent = `${parseInt(degrees)}º`

    switch(condition) {
        case 'Clear':
            img.src = 'img/weather/sol.png'
            break
        
        case 'Clouds':
            img.src = 'img/weather/nebuloso.png'
            break

        case 'Rain':
            img.src = 'img/weather/chuvoso.png'
    }

}

async function getCity() {

    setTimeout(() => {
        const search = document.getElementById('search')
        const input = document.getElementById('searchInput')
        const local = document.getElementById('local')

        search.addEventListener('click', async () => {
            let city = ''

            if(input.value !== '') {
                city = input.value
                input.classList.toggle('hidden')
                local.classList = ''
                await weather(city)
            } else {
                input.classList.toggle('hidden')
            }
            input.value = ''
            lastCity = city
        })
    }, 100)
}

getCity()

function startWeather(lastCity) {
    if(lastCity !== ''){
        local.classList = ''
        weather(lastCity)
    }
}

startWeather(lastCity)

function clock() {
        setInterval(() => {
            
            let day = ''
            let week = ''
            let hours = ''
            
            if(sections.home.innerHTML !== '') {
                day = document.getElementById('day')
                week = document.getElementById('week')
                hours = document.getElementById('hours')
            }
            const clock = new Date()
            
            const monthName = ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Maio', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.']
            const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']

            const today = clock.getDate()
            const monthIndex = clock.getMonth()
            const month = monthName[monthIndex]
            const year = clock.getFullYear()

            const formattedDay = `${today} ${month} ${year}`
            day.textContent = formattedDay

            const weekIndex = clock.getDay()
            const currentWeek = daysOfWeek[weekIndex]

            week.textContent = currentWeek

            let hr = clock.getHours()
            let min = clock.getMinutes()
            let s = clock.getSeconds()

            if(hr < 10) {hr = '0' + hr}
            if(min < 10) {min = '0' + min}
            if(s < 10) {s = '0' + s}
            
            const formattedHours = `${hr}:${min}:${s}`
            hours.textContent = formattedHours

        }, 1000)
}

clock()

function totalRegistered() {
    const registered = document.getElementById('registered')

    const totalContainer = document.createElement('div')
    totalContainer.classList = 'totalContainer'

    const color = document.createElement('div')
    color.id = 'color'

    const total = document.createElement('div')
    total.id = 'total'
    total.textContent = `Total: ${data.length}`

    if(data.length > 0) {
        color.style.background = 'Green'
    } else {
        color.style.background = 'red'
    }

    totalContainer.append(color, total)
    registered.append(totalContainer)
}






//  Criação da lista de pessoas instanciada que serão gerenciadas --------------------------------------------------------

function createList(person, ul) {
    const div = document.createElement('div')

    const li = document.createElement('li')
    li.id = 'person'
    li.classList = 'person'

    const introduceYourselfBtn = document.createElement('button')
    introduceYourselfBtn.classList = 'btn'
    introduceYourselfBtn.textContent = 'Apresentar-se'

    const toWorkBtn = document.createElement('button')
    toWorkBtn.classList = 'btn'
    toWorkBtn.textContent = 'Trabalhar'

    const programBtn = document.createElement('button')
    programBtn.classList = 'btn'
    programBtn.textContent = 'Programar'

    const toManageBtn = document.createElement('button')
    toManageBtn.classList = 'btn'
    toManageBtn.textContent = 'Gerenciar'

    switch(person.office) {
        case 'Desenvolvedor':
            li.innerHTML = `<div>
                    <p>
                        <span>Nome: </span> ${person.name}
                    </p>
                    <p>
                        <span>Cargo: </span> ${person.office} 
                    </p>
                    <p>
                        <span>Linguagem: </span> ${person.language} 
                    </p>
            </div>`

            introduceYourselfBtn.addEventListener('click', () => person.introduceYourself())
            programBtn.addEventListener('click', () => person.program())
    
            div.append(introduceYourselfBtn, programBtn)
            li.appendChild(div)

            break;

        case 'Gerente':
            li.innerHTML = `<div>
                <p>
                    <span>Nome: </span> ${person.name}
                </p>
                <p>
                    <span>Cargo: </span> ${person.office} 
                </p>
                <p>
                    <span>Departamento: </span> ${person.department} 
                </p>
            </div>`

            introduceYourselfBtn.addEventListener('click', () => person.introduceYourself())
            toManageBtn.addEventListener('click', () => person.toManage())

            div.append(introduceYourselfBtn, toManageBtn)
            li.appendChild(div)

            break;

        default: 
        li.innerHTML = `<div>
            <p>
                <span>Nome: </span> ${person.name}
            </p>
            <p>
                <span>Cargo: </span> ${person.office} 
            </p>
        </div>`

        introduceYourselfBtn.addEventListener('click', () => person.introduceYourself())
        toWorkBtn.addEventListener('click', () => person.toWork())

        div.append(introduceYourselfBtn, toWorkBtn)
        li.appendChild(div)
    }
    
    ul.appendChild(li)
}

function toManage() {

    const ul = document.createElement('ul')
    ul.classList = 'list-person'

    if(sections.toManage.innerHTML === '') {
    sections.toManage.appendChild(ul)
    }

    data.forEach(person => {
        createList(person, ul)
    })
}




// Criaçao de um form para registrar funcionarios -----------------------------------------------------------------------

function register() {

    const h2 = document.createElement('h2')
    h2.textContent = 'Insira as informações do funcionário'

    const form = document.createElement('form')
    form.id = 'form'

    const nameLabel = document.createElement('label')
    nameLabel.textContent = 'Nome do funcionário'
    nameLabel.setAttribute('for', 'name')

    const nameInput = document.createElement('input')
    nameInput.id = 'name'
    nameInput.name = 'name'

    const ageLabel = document.createElement('label')
    ageLabel.textContent = 'Idade'
    ageLabel.setAttribute('for', 'age')

    const ageInput = document.createElement('input')
    ageInput.id = 'age'
    ageInput.name = 'age'

    const officeLabel = document.createElement('label')
    officeLabel.textContent = 'Cargo'
    officeLabel.setAttribute('for', 'office')

    const officeSelect = document.createElement('select')
    officeSelect.id = 'office'
    officeSelect.name = 'office'

    const defaultOption = document.createElement('option')
    defaultOption.textContent = 'Selecione um cargo'
    officeSelect.add(defaultOption)

    const options = ['Funcionario', 'Desenvolvedor', 'Gerente']

    options.forEach(optionText => {
        const option = document.createElement('option')
        option.value = optionText
        option.textContent = optionText
        officeSelect.add(option)
    })

    const departmentLabel = document.createElement('label')
    departmentLabel.textContent = 'Departamento'
    departmentLabel.setAttribute('for', 'department')

    const departmentInput = document.createElement('input')
    departmentInput.id = 'department'
    departmentInput.name = 'department'

    const languageLabel = document.createElement('label')
    languageLabel.textContent = 'Linguagem de programação'
    languageLabel.setAttribute('for', 'language')

    const languageInput = document.createElement('input')
    languageInput.id = 'language'
    languageInput.name = 'language'

    const submit = document.createElement('input')
    submit.type = 'submit'
    submit.id = 'submit'
    submit.value = "Cadastrar"

    sections.register.appendChild(form)
    form.append(h2, nameLabel, nameInput, ageLabel, ageInput, officeLabel, officeSelect, departmentLabel, departmentInput, languageLabel, languageInput, submit)

}





// Função para instanciar as classes ------------------------------------------------------------------------------------------------

function createInstance(className, name, age, office, department, language) {
    const person =  new className(name, age, office, department, language)

    data.push(person)
}





// Coletando os valores de entrada e instanciando classes ----------------------------------------------------------------------------------------

function clearInputs() {
    document.getElementById('name').value = ''
    document.getElementById('age').value = ''
    document.getElementById('office').value = 'Selecione um cargo'
    document.getElementById('department').value = ''
    document.getElementById('language').value = ''
}

function submit() {
    sections.register.addEventListener('submit', ev => {
        ev.preventDefault()

        const inputs = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            office: document.getElementById('office').value,
            department: document.getElementById('department').value,
            language: document.getElementById('language').value
        }

        let dataInput = {
            name: inputs.name,
            age: parseFloat(inputs.age),
            office: inputs.office,
            department: inputs.department,
            language: inputs.language
        }

        try {
            if(typeof dataInput.name !== 'string') {
                throw new Error ('O nome deve conter apenas letras!')
            } else if(dataInput.name === '') {
                throw new Error ('Parece que você esqueceu de preencher o campo "Nome do funcionário". Por favor, insira um nome para prosseguir.')
            } else if( isNaN(dataInput.age) || dataInput.age === '') {
                throw new Error ('Parece que você esqueceu de preencher o campo "Idade" ou inseriu um valor inválido. Por favor, insira uma idade válida para prosseguir.')
            } else if(dataInput.office === 'Selecione um cargo') {
                throw new Error ('Parece que você esqueceu de selecionar um cargo. Por favor, selecione um cargo para prosseguir.')
            }
        } catch (error) {
            alertBox(error.message)
        }

        if (dataInput.name && dataInput.age !== '' && dataInput.office !== 'Selecione um cargo') {
            if(dataInput.office === 'Desenvolvedor') {
                createInstance(Developer, dataInput.name, dataInput.age, dataInput.office, dataInput.language)
            } else if(dataInput.office === 'Gerente') {
                createInstance(Manager, dataInput.name, dataInput.age, dataInput.office, dataInput.department)
            } else {
                createInstance(Employeer, dataInput.name, dataInput.age, dataInput.office, dataInput.department, dataInput.language)
            }
            
            clearInputs()
        }
        console.log(data)
    })
}





// Lista de funcionarios

function listOfEmployees(person, ol, index) {
    const div = document.createElement('div')

    const li = document.createElement('li')
    li.classList = 'employees'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList = 'btn'
    deleteBtn.textContent = 'Excluir'

    switch(person.office) {
        case 'Desenvolvedor':
            li.id = index
            li.innerHTML = `<div>
                    <p>
                        <span>Nome: </span> ${person.name}
                    </p>
                    <p id="age-list">
                        <span>Idade: </span> ${person.age}
                    </p>
                    <p>
                        <span>Cargo: </span> ${person.office} 
                    </p>
                    <p>
                        <span>Linguagem: </span> ${person.language} 
                    </p>
            </div>`
    
            div.append(deleteBtn)
            li.appendChild(div)

            deleteBtn.addEventListener('click', () => {
                document.getElementById(li.id).remove()
                data.splice(li.id, 1)
            })

            break;

        case 'Gerente':
            li.id = index
            index++
            li.innerHTML = `<div>
                <p>
                <span>Nome: </span> ${person.name}
                </p>
                <p id="age-list">
                    <span>Idade: </span> ${person.age}
                </p>
                <p>
                    <span>Cargo: </span> ${person.office} 
                </p>
                <p>
                    <span>Departamento: </span> ${person.department}
                </p>
            </div>`

            div.append(deleteBtn)
            li.appendChild(div)

            deleteBtn.addEventListener('click', () => {
                document.getElementById(li.id).remove()
                data.splice(li.id, 1)
            })

            break;

        default: 
        li.id = index
        index++
        li.innerHTML = `<div>
            <p>
                <span>Nome: </span> ${person.name}
            </p>
            <p id="age-list">
                <span>Idade: </span> ${person.age}
            </p>
            <p>
                <span>Cargo: </span> ${person.office} 
            </p>
        </div>`

        div.append(deleteBtn)
        li.appendChild(div)

        deleteBtn.addEventListener('click', () => {
            document.getElementById(li.id).remove()
            data.splice(li.id, 1)
        })

    }
    
    ol.appendChild(li)
}

function employees() {
    const ol = document.createElement('ol')
    ol.classList = 'list-employees'

    if(sections.employees.innerHTML === '') {
        sections.employees.appendChild(ol)
    }

    let index = 0

    data.forEach(person => {
        listOfEmployees(person, ol, index)
        index++
    })
}

// alertBox('Testo demonstrativo para testar a box')
function start() {
    navItemActive()

    removeRender()

    home()

    totalRegistered()


    navItems[0].addEventListener('click', () => {
        sections.home.classList = ''
        home()
        getCity()
        startWeather(lastCity)
        totalRegistered()
    })

    navItems[1].addEventListener('click', () => {
        sections.toManage.classList = ''
        toManage()
    })

    navItems[2].addEventListener('click', () => {
        sections.register.classList = ''
        register()
    })

    submit()

    navItems[3].addEventListener('click', () => {
        sections.employees.classList = ''
        employees()
        start = false
    })
}

start()