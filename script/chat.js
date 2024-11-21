export const pedidoCliente = {
    nome: "",
    servico: "",
    dia: "",
    mes: "",
    hora: "",
    isOkay: false
};

const chatbox = document.getElementById('chatbox');
const submitButton = document.getElementById('submitButton');
const inputField = document.getElementById('userInput');

const rules = {
    "hello": "Hi there! How can I assist you?",
    "how are you": "I'm just a bot, but I'm here to help!",
    "what's your name": "I am your friendly rule-based chatbot.",
    "bye": "Goodbye! Have a great day!",
    // Add more rules as needed
};

function getResponse(userInput) {
    userInput = userInput.toLowerCase();
    return rules[userInput] || "I'm sorry, I don't understand that.";
}

let userInput = '';

window.onload = function() {
    displayWelcome();
};

function displayWelcome() {
    const greetingMessage = "A <strong>Clínica Aline Alves Podologia </strong> oferece cuidados especializados para a saúde dos seus pés. <br> Estamos localizados na <strong>Av. São Paulo, Nº 49, no bairro Vila Jordanopolis, em São Bernardo do Campo - SP.</strong> <br>Ofereçemos servicos como: <br><strong>1-Podologia</strong> <br><strong>2-cílios</strong> <br><strong>3-sobrancelha</strong>. <br><br>Se você deseja marcar uma consulta, escolha um serviço desejado. <br><br> Para mais informações,<strong> acesse nosso site pressionando o botão 'site'</strong>";
    chatbox.innerHTML += `<div class="bot">${greetingMessage}</div>`;
    showOptions();
};

function showOptions() {
    chatbox.innerHTML += `<div class="box-options">
        <button id="podologiaButton" class="options"><p>Podologia</p></button>
        <button id="ciliosButton" class="options"><p>Cílios</p></button>
        <button id="sobrancelhaButton" class="options"><p>Sobrancelha</p></button>
        <button id="siteButton" class="options"><a target="blank" href="./paginaInicial.html"><p>Site</p</a></button>
    </div>`;
    
    // Add event listeners for each button
    document.getElementById('podologiaButton').addEventListener('click', podologia);
    document.getElementById('ciliosButton').addEventListener('click', cilios);
    document.getElementById('sobrancelhaButton').addEventListener('click', sobrancelha);
    document.getElementById('siteButton').addEventListener('click', site);
    
    console.log(pedidoCliente);
};



function podologia() {
    inputField.style.display = 'block';
    submitButton.style.display = 'block';
    userInput = inputField.value;
    pedidoCliente.servico = "Podologia";
    chatbox.innerHTML += `<div class="user"><p>Podologia</p></div>`;
    chatbox.innerHTML += `<div class="bot"><p>Excelente escolha. No entanto, antes, poderia me informar seu nome?</p></div>`;
    inputField.addEventListener('keydown', handleInput);
    submitButton.addEventListener('click', handleInput); 
    console.log(pedidoCliente);  
};

function cilios() {
    inputField.style.display = 'block';
    submitButton.style.display = 'block';
    userInput = inputField.value;
    pedidoCliente.servico = "cilios";
    chatbox.innerHTML += `<div class="user"><p>Cílios</p></div>`;
    chatbox.innerHTML += `<div class="bot"><p>Excelente escolha. No entanto, antes, poderia me informar seu nome?</p></div>`;
    inputField.addEventListener('keydown', handleInput);
    submitButton.addEventListener('click', handleInput); 
    console.log(pedidoCliente);  
};

function sobrancelha() {
    inputField.style.display = 'block';
    submitButton.style.display = 'block';
    userInput = inputField.value;
    pedidoCliente.servico = "sobrancelha";
    chatbox.innerHTML += `<div class="user"><p>sobrancelha</p></div>`;
    chatbox.innerHTML += `<div class="bot"><p>Excelente escolha. No entanto, antes, poderia me informar seu nome?</p></div>`;
    inputField.addEventListener('keydown', handleInput);
    submitButton.addEventListener('click', handleInput); 
    console.log(pedidoCliente);  
};

function handleInput(event) {
    if (event.key === 'Enter' || event.type === 'click') {
        userInput = inputField.value;
        if(userInput.trim() === '') {
            chatbox.innerHTML += `<div class="bot"><p>Por gentileza, escreva seu nome!</p></div>`;
        } else {
            pedidoCliente.nome = userInput;
            console.log(pedidoCliente);
            
            // Display user input
            chatbox.innerHTML += `<div class="user">${userInput}</div>`;
            
            // Clear the input field
            inputField.value = '';
            
            // Scroll to the bottom of the chatbox
            chatbox.scrollTop = chatbox.scrollHeight;

            chatbox.innerHTML += `<div class="bot"><p>${pedidoCliente.nome} para qual mês gostaria de marcar a consulta?</p>`;
            chatbox.innerHTML+= `<div class="box-options">
            <label for="monthSelect">Escolha o mês:</label> 
            <select id="monthSelect">
            <option value="0">Janeiro</option>
            <option value="1">Fevereiro</option>
            <option value="2">Março</option>
            <option value="3">Abril</option>
            <option value="4">Maio</option>
            <option value="5">Junho</option>
            <option value="6">Julho</option>
            <option value="7">Agosto</option>
            <option value="8">Setembro</option>
            <option value="9">Outubro</option>-
            <option value="10">Novembro</option>
            <option value="11">Dezembro</option>
            </select>
            <button id="enviar"><p>Enviar</p></button>
            </div>`;

            document.getElementById('enviar').addEventListener('click', chooseday);
            console.log(pedidoCliente);
            
           /* let infoCliente = `Olá, meu nome é ${pedidoCliente.nome}. Gostaria de marcar uma consulta de ${pedidoCliente.servico}. Qual o preço do atendimento? e os horários disponíveis por favor!`;
            chatbox.innerHTML += `<div class="bot"><p>Ótima escolha ${pedidoCliente.nome}.<br>Clique no link para acessar o WhatsApp da Clínica Aline Alves Podologia e solicitar um orçamento ou agende através de nossa agenda.<br>Agradecemos pelo seu contato!</p></div>`;
            chatbox.innerHTML += `<button><a target="blank" href="https://wa.me/5511983284301?text=${encodeURIComponent(infoCliente)}">ir para o Whatsapp</a></button>`;
            chatbox.innerHTML += `<button><a target="blank" href="#">Ir para a agenda eletrônica</a></button>`;*/
        }
    }
}

function chooseday() {

    let mesConsulta = document.getElementById('monthSelect');
    pedidoCliente.mes = mesConsulta.value;
    console.log(pedidoCliente);
    chatbox.innerHTML += `<div class="bot"><p>${pedidoCliente.nome} para qual dia gostaria de marcar sua consulta?</p></div>`;
    chatbox.innerHTML += `<div class="box-options">
    <label for="daySelect">Escolha o dia:</label>
    <select id="daySelect">
    <option value="0">0</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
    <option value="11">11</option>
    <option value="12">12</option>
    <option value="13">13</option>
    <option value="14">14</option>
    <option value="15">15</option>
    <option value="16">16</option>
    <option value="17">17</option>
    <option value="18">18</option>
    <option value="19">19</option>
    <option value="20">20</option>
    <option value="21">21</option>
    <option value="22">22</option>
    <option value="23">23</option>
    <option value="24">24</option>
    <option value="25">25</option>
    <option value="26">26</option>
    <option value="27">27</option>
    <option value="28">28</option>
    <option value="29">29</option>
    <option value="30">30</option>
    <option value="31">31</option>
    </select>
    <button id="enviarDia"><p>Enviar</p></button>
    </div>`;
    document.getElementById('enviarDia').addEventListener('click', escolherHorario);
    console.log(pedidoCliente);
   
}


function escolherHorario() {
    let diaCliente = document.getElementById('daySelect');
    pedidoCliente.dia = diaCliente.value;
    chatbox.innerHTML += `<div class="bot"<p>${pedidoCliente.nome}Escolha o horário da sua consulta</p></div>`;
    chatbox.innerHTML += `<div class="box-options">
    <label for="timeSelect">Escolha a hora:</label>
    <input type="time" id="timeSelect" min="08:00" max="17:00" step="3600">
    <button id="enviarHora">Enviar</button>
    </div>`;
    document.getElementById('enviarHora').addEventListener('click', finalizarAgendamento);
    console.log(pedidoCliente);
}


function finalizarAgendamento() {
    let horaCliente = document.getElementById('timeSelect');
    pedidoCliente.hora = horaCliente.value;
    chatbox.innerHTML += `<div class="bot"><p>${pedidoCliente.nome} sua consulta foi marcarda para o dia ${pedidoCliente.dia}, mês ${pedidoCliente.mes} às ${pedidoCliente.hora}. Muito obrigado, caso tenha alguma dúvida acesse nosso <a target="blank" href="#">Whatsapp</a> ou nosso <a target="blank" href="#">Site</a></p></div>`
    console.log(pedidoCliente);
    pedidoCliente.isOkay = true;
}

/*function myFunction() {
    // This is a placeholder for the other buttons' functionality
    console.log('Button clicked!');
}*/
