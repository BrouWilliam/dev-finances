const Modal = {
    open(){
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        document.querySelector('.modal-overlay').classList.remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -15000,
        date: '23/01/2022'
    },
    {
        id: 2,
        description: 'Internet',
        amount: -10000,
        date: '15/01/2022'
    },
    {
        id: 3,
        description: 'Website',
        amount: 100000,
        date: '15/01/2022'
    },
    {
        id: 4,
        description: 'Salário',
        amount: 125000,
        date: '15/01/2022'
    }
]

const Transaction = {
    incomes(){
        let income = 0

        transactions.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount
            }
        })

        return income
    },
    expenses(){
        let expense = 0

        transactions.forEach( transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount
            }
        })

        return expense
    },
    total(){
        return Transaction.incomes() + Transaction.expenses()
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        DOM.transactionsContainer.appendChild(tr)

    },
    innerHTMLTransaction(transaction){
        const CSSClass = transaction.amount > 0 ? 'income' : 'expense'

        const amount = Utils.formatCurrency(transaction.amount)
        
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSClass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="assets/minus.svg" alt=""></td>
        `

        return html
    },

    updateBalance(){
        document.querySelector('#incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.querySelector('#expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.querySelector('#totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    }
}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        return signal + value
    }
}


transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()