let transactions = [];
let categories = ['Food', 'Rent', 'Travel', 'Entertainment', 'Other'];

// Function to update the dashboard (Income, Expenses, Balance)
function updateDashboard() {
    let totalIncome = 0;
    let totalExpenses = 0;

    // Calculate total income and expenses
    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    const balance = totalIncome + totalExpenses;

    // Update dashboard display
    document.getElementById('totalIncome').textContent = `Total Income: ₹ ${totalIncome.toLocaleString()}`;
    document.getElementById('totalExpenses').textContent = `Total Expenses: ₹ ${totalExpenses.toLocaleString()}`;
    document.getElementById('balanceAmount').textContent = `Balance: ₹ ${balance.toLocaleString()}`;

    // Update charts
    updateCharts();
}

// Function to update the charts (Bar and Pie)
function updateCharts() {
    // Spending Breakdown by Category (Bar Chart)
    let spendingData = categories.map(category => {
        return transactions.filter(t => t.category === category).reduce((sum, t) => sum + t.amount, 0);
    });

    const spendingBarChart = new Chart(document.getElementById('spendingBarChart'), {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Spending by Category',
                data: spendingData,
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Spending Breakdown (Pie Chart)
    const spendingPieChart = new Chart(document.getElementById('spendingPieChart'), {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: spendingData,
                backgroundColor: ['#2ecc71', '#e74c3c', '#f39c12', '#8e44ad', '#95a5a6'],
                hoverBackgroundColor: ['#27ae60', '#c0392b', '#f39c12', '#9b59b6', '#7f8c8d']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ₹ ${tooltipItem.raw.toLocaleString()}`;
                        }
                    }
                }
            }
        }
    });
}

// Handle form submission and add transactions
document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    // Add transaction to the list
    transactions.push({ description, amount, category });

    // Update the dashboard
    updateDashboard();

    // Reset form fields
    document.getElementById('transactionForm').reset();
});
