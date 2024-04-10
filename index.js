// Array para armazenar despesas
let expenses = [];

// Variável para armazenar o saldo inicial
let initialBalance = 0;

function displayExpenses() {
    const expensesList = document.getElementById('expensesList');
    expensesList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.textContent = `${expense.name}: R$ ${expense.amount.toFixed(2).replace('.', ',')}`;
        expensesList.appendChild(li);
    });
}

// Função para calcular e exibir saldo
function displayBalance() {
    const balanceAmount = document.getElementById('balanceAmount');
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const totalBalance = initialBalance - totalExpenses;

    // Exibe o saldo atualizado (saldo inicial + gastos) em formato de moeda brasileira
    balanceAmount.textContent = `R$ ${totalBalance.toFixed(2).replace('.', ',')}`;

    // Exibe o saldo em vermelho se for negativo
    balanceAmount.style.color = totalBalance >= 0 ? 'green' : 'red';

     // Adiciona emoji triste se o saldo for negativo
     if (totalBalance >= 0) {
        balanceAmount.style.color = 'green';
        // Adiciona emoji feliz se o saldo for positivo
        balanceAmount.innerHTML += ' 😄';
    } else {
        balanceAmount.style.color = 'red';
        // Adiciona emoji triste se o saldo for negativo
        balanceAmount.innerHTML += ' 😢';
    }
}


// Adicionar despesa
function addExpense() {
    const expenseName = document.getElementById('expenseName').value;
    const expenseAmount = parseFloat(document.getElementById('expenseAmount').value);

    if (expenseName && expenseAmount) {
        expenses.push({ name: expenseName, amount: expenseAmount });
        displayExpenses();
        displayBalance();
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Definir saldo inicial
document.getElementById('initialBalance').addEventListener('change', function() {
    initialBalance = parseFloat(this.value) || 0;
    displayBalance();
});

// Event listener para botão de adicionar despesa
document.getElementById('addExpenseBtn').addEventListener('click', addExpense);

// Limpar tudo
document.getElementById('clearAllBtn').addEventListener('click', function() {
    expenses = [];
    initialBalance = 0;
    displayExpenses();
    displayBalance();
    document.getElementById('initialBalance').value = '';
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
});

// Exibe saldo inicial ao carregar a página
displayBalance();
