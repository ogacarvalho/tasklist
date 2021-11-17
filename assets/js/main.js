// Dados
const inputTarefa = document.querySelector('.inp__tarefa');
const  btnTarefa = document.querySelector('.btn__tarefa');
const tarefa = document.querySelector('.tarefa');
// Criadora de Listas
const criaLi = () => {                                  
    const li = document.createElement('li');              // 1. LI recebe a criação de um elemento 'li'
    return li;                                            // 2. Toda vez que a função for chamada, irá retornar a criação de uma lista.
};

//Limpa os dados do input e direciona o foco da página a ele.
const limpaInput = () => {
    inputTarefa.value = '';                               // 1. Valor que está no input receberá null.
    inputTarefa.focus();                                  // 2. O input receberá o evento HTML (foco).
}

//Agora vamos preparar um botão apagar para a lista.
const btnApagar = (li) => {                              // 0. Este botão está sendo preparado para lista.
    li.innerText += ' ';                                 // 1. A lista receberá um adição de 'Espaço'.
    const apagar = document.createElement('button');     // 2. Apagar receberá a criação do botão apagar.
    apagar.innerText = 'Apagar';                         // 3. O botão apagar recebe o texto "Apagar"
    li.appendChild(apagar);                              // 4. A lista recém criada! recebe o botão apagar.
    apagar.setAttribute('class', 'apagar');              // 5. Identificamos o botão adicionando um atributo de classe com nome 'apagar'.
}


//Função que converte os dados do input em listas.
const criaTarefa = (input) => {                        // 1. Cria-se o 'Input' que interpretará os argumentos dos escutadores.
    const li = criaLi();                               // 2. Aciona a criação de uma lista.
    li.innerText = input;                              // 3. Lista recebe os dados do input.
    tarefa.appendChild(li);                            // 4. Tarefa anexa a lista recém-criada ao seu corpo.
    btnApagar(li);                                     // 5. Botão Apagar é acionado. (preparado para lista)
    limpaInput();                                      // 6. Criado a tarefa, vamos direcionar o foco da página.
    atualizaLocalStorage();                               // 7. Acionamento da função que limpa o input e direciona o foco.
};

//Evento que escutador de teclas (Enter)
inputTarefa.addEventListener('keypress', function(e){  // 1. Evento (e) de escuta para teclas recém pressionadas.
    if(e.keyCode === 13){                              // 2. Busca no evento o código da tecla enter (13)
        if(!inputTarefa.value) return;                 // 3. Após encontrado, se o valor do input for (false) apenas retorne.
        criaTarefa(inputTarefa.value);                 // 4. Se encontrado, a função criaTarefa receberá os dados do input como argumentos.
        
    }
});

//Escutador de Click
btnTarefa.addEventListener( 'click', function (){     // 1. No botão de adicionar tarefa, crie um escutador de click.  
    if(!inputTarefa.value) return;                    // 2. Com click e input (false), apenas retorne.
    criaTarefa(inputTarefa.value);                    // 3. Com click e input (true), acione a função que receberá como arg. os dados do input.
});

//Função Delete
document.addEventListener('click', function(e){       // 1. Adicionamos um escutador de click na página.
    const elemento = e.target;                        // 2. No click (e) enviamos o objeto do click para o elemento.
    if(elemento.classList.contains('apagar')){        // 3. Se o objeto do click tiver uma classe "apagar"...
        elemento.parentElement.remove();              // 3.1 ... Então remova (delete) o elemento Pai.
        limpaInput();                                 // 4. Aciona função que limpa e direciona o foco do input.
        atualizaLocalStorage();                       // 5. Estamos salvando o atual estado da lista, no localStorage.
    };
});

//Função que Salva o Estado Atual dos Arquivos.
const atualizaLocalStorage = () => {                  // 0. Aqui selecionamos e salvamos no armazenamento local o atual estado do arquivo configurado e convertido.
    const liTarefas = tarefa.querySelectorAll('li');  // 1. Selecionamos as ocorrências da lista
    const lista = [];                                 // 2. Criamos uma array Vazia.
    
    for(let tarefa of liTarefas){                     // 3. Iteramos as ocorrências da lista.
        let tarefaTexto = tarefa.innerText;           // 4. A variável tarefaTexto recebe os dados iterados da lista.
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();  // 5. Ajustes (trim) remove espaços vázios.
        lista.push(tarefaTexto);                      // 5. Array vazia (lista), recebe os dados iterados e ajustados.
    }

    const tarefasJSON = JSON.stringify(lista);        // 6. Salvando arquivos JSON convertidos em STRING provenientes da lista. 
    localStorage.setItem('tarefas', tarefasJSON);     // 7. LocalStorage receberá o arquivo JSON re-nomeado para (tarefas).

};

// // Função que obtém os dados do Armazenamento Local
// const obtemDadosLocalStorage = () => {
//     const dadosLS = localStorage.getItem('tarefas');  // 1. Obtemos e armazenamos dados do LS que estão em formato JSON (Array em String Puro);
//     const JSONtoJS = JSON.parse(dadosLS);             // 2. Conversão do formato JSON (Array em String Puro) para (Array de JS) (Funcional).
//     for (let iteracoes of JSONtoJS){                  // 3. Vamos iterar o arquivo Array e assim prepara-lo para uso, onde a cada loop de iteração executar a função de criação de tarefas com o input "iteracoes".
//         criaTarefa(iteracoes);                        // 4. Os dados preparados e separados por item através da iteração da lista do Array, serão enviados á cada loop como argumentos para a criação de uma nova tarefa, porém agora provenientes do armazenamento local.
//     }
// };
// obtemDadosLocalStorage();

(obtemDadosLs = () => {
    const dadosLS = localStorage.getItem('tarefas');
    const converteJSON = JSON.parse(dadosLS);

    for (i = 0; i < converteJSON.length; i++){
        const dados = converteJSON[i];
        criaTarefa(dados);
    }
})();
