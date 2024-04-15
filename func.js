// Function to calculate tax breakdown and render charts
function calculateAndRenderCharts(income, extraIncome, deductions) {
  // Calculate tax breakdown
  const incomeTax = calculateTax(income, extraIncome, "<40", deductions);
  const extraIncomeTax = calculateTax(income, extraIncome, ">=40&<60", deductions);
  const deductionsTax = calculateTax(income, extraIncome, ">=60", deductions);

  // Render pie chart
  renderPieChart(incomeTax, extraIncomeTax, deductionsTax);

  // Render bar chart
  renderBarChart(incomeTax, extraIncomeTax, deductionsTax);

  // Render line chart
  renderLineChart(income, extraIncome, deductions);
}

// Function to render pie chart
function renderPieChart(incomeTax, extraIncomeTax, deductionsTax) {
  const pieChartCanvas = document.getElementById('taxPieChart').getContext('2d');
  new Chart(pieChartCanvas, {
    type: 'pie',
    data: {
      labels: ['Income Tax', 'Extra Income Tax', 'Deductions Tax'],
      datasets: [{
        label: 'Tax Breakdown',
        data: [incomeTax, extraIncomeTax, deductionsTax],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Tax Breakdown (Pie Chart)'
      }
    }
  });
}

// Function to render bar chart
function renderBarChart(incomeTax, extraIncomeTax, deductionsTax) {
  const barChartCanvas = document.getElementById('taxBarChart').getContext('2d');
  new Chart(barChartCanvas, {
    type: 'bar',
    data: {
      labels: ['Income Tax', 'Extra Income Tax', 'Deductions Tax'],
      datasets: [{
        label: 'Tax Breakdown',
        data: [incomeTax, extraIncomeTax, deductionsTax],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Tax Breakdown (Bar Chart)'
      }
    }
  });
}

// Function to render line chart
function renderLineChart(income, extraIncome, deductions) {
  const lineChartCanvas = document.getElementById('taxLineChart').getContext('2d');
  new Chart(lineChartCanvas, {
    type: 'line',
    data: {
      labels: ['Gross Annual Income', 'Extra Income', 'Total Deductions'],
      datasets: [{
        label: 'Amount (in Lakhs)',
        data: [income, extraIncome, deductions],
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Income Details (Line Chart)'
      }
    }
  });
}

// Function to calculate tax
function calculateTax(income, extraIncome, ageGroup, deductions) {
  let tax = 0;
  const taxableIncome = income + extraIncome - deductions - 800000;

  if (taxableIncome > 0) {
    if (ageGroup === "<40") {
      tax = taxableIncome * 0.3;
    } else if (ageGroup === ">=40&<60") {
      tax = taxableIncome * 0.4;
    } else if (ageGroup === ">=60") {
      tax = taxableIncome * 0.1;
    }
  }

  return tax < 0 ? 0 : tax;
}

// Call the function to calculate and render the charts when the form is submitted
const form = document.getElementById('tax-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const income = parseFloat(document.getElementById('income').value);
  const extraIncome = parseFloat(document.getElementById('extra-income').value) || 0;
  const deductions = parseFloat(document.getElementById('deductions').value) || 0;

  calculateAndRenderCharts(income, extraIncome, deductions);
});
