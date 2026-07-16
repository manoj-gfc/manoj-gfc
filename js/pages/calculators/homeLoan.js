/**
 * ============================================
 * HOME LOAN & EMI CALCULATOR
 * File: js/pages/calculators/homeLoan.js
 * ============================================
 */

window.GFC_homeLoan = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Home Loan & EMI Calculator</h2>

            <p class="calculator-description">
                Calculate your monthly EMI, total interest payable,
                and total repayment amount for your home loan.
            </p>

            <div class="calculator-form">

                <!-- Loan Amount -->

                <div class="form-group">

                    <label for="loanAmount">
                        Loan Amount (₹)
                    </label>

                    <input
                        type="number"
                        id="loanAmount"
                        min="1"
                        step="1000"
                        placeholder="Enter loan amount">

                </div>

                <!-- Annual Interest Rate -->

                <div class="form-group">

                    <label for="interestRate">
                        Annual Interest Rate (%)
                    </label>

                    <input
                        type="number"
                        id="interestRate"
                        min="0"
                        step="0.01"
                        placeholder="Enter interest rate">

                </div>

                <!-- Loan Tenure -->

                <div class="form-group">

                    <label for="loanTenure">
                        Loan Tenure (Years)
                    </label>

                    <input
                        type="number"
                        id="loanTenure"
                        min="1"
                        step="1"
                        placeholder="Enter loan tenure">

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculateLoan"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetLoan"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="loanResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>📊 Loan Summary</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>💳 Monthly EMI</span>

                            <strong id="emiResult">
                                ₹ 0
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>💰 Total Interest</span>

                            <strong id="interestResult">
                                ₹ 0
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🏦 Total Repayment</span>

                            <strong id="paymentResult">
                                ₹ 0
                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    `;
        // ==========================================
    // PART 2 - DOM ELEMENTS
    // ==========================================

    // Input Elements

    const loanAmountInput =
        section.querySelector("#loanAmount");

    const interestRateInput =
        section.querySelector("#interestRate");

    const loanTenureInput =
        section.querySelector("#loanTenure");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculateLoan");

    const resetBtn =
        section.querySelector("#resetLoan");

    // Result Container

    const resultBox =
        section.querySelector("#loanResult");

    // Result Fields

    const emiResult =
        section.querySelector("#emiResult");

    const interestResult =
        section.querySelector("#interestResult");

    const paymentResult =
        section.querySelector("#paymentResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Constants

    const MONTHS_IN_YEAR = 12;

    // ==========================================
    // FORMAT CURRENCY
    // ==========================================

    function formatCurrency(amount) {

        return "₹ " + amount.toLocaleString("en-IN", {
            maximumFractionDigits: 0
        });

    }

    // ==========================================
    // SHOW RESULT
    // ==========================================

    function showResult() {

        resultBox.style.display = "block";

        resultBox.scrollIntoView({

            behavior: "smooth",

            block: "nearest"

        });

    }

    // ==========================================
    // HIDE RESULT
    // ==========================================

    function hideResult() {

        resultBox.style.display = "none";

    }
        // ==========================================
    // PART 4 - EVENT LISTENERS & CALCULATION
    // ==========================================

    calculateBtn.addEventListener("click", () => {

        // Get Input Values

        const principal =
            parseFloat(loanAmountInput.value);

        const annualRate =
            parseFloat(interestRateInput.value);

        const years =
            parseInt(loanTenureInput.value);

        // Validation

        if (
            isNaN(principal) ||
            isNaN(annualRate) ||
            isNaN(years) ||
            principal <= 0 ||
            annualRate <= 0 ||
            years <= 0
        ) {

            alert("Please enter valid loan details.");

            loanAmountInput.focus();

            return;

        }

        // EMI Formula

        const monthlyRate =
            annualRate / 12 / 100;

        const totalMonths =
            years * MONTHS_IN_YEAR;

        const emi =
            (principal *
                monthlyRate *
                Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);

        // Loan Summary

        const totalPayment =
            emi * totalMonths;

        const totalInterest =
            totalPayment - principal;

        // Display Results

        emiResult.textContent =
            formatCurrency(Math.round(emi));

        interestResult.textContent =
            formatCurrency(Math.round(totalInterest));

        paymentResult.textContent =
            formatCurrency(Math.round(totalPayment));

        // Show Result

        showResult();

    });
        // ==========================================
    // PART 5 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Inputs

        loanAmountInput.value = "";

        interestRateInput.value = "";

        loanTenureInput.value = "";

        // Reset Results

        emiResult.textContent =
            "₹ 0";

        interestResult.textContent =
            "₹ 0";

        paymentResult.textContent =
            "₹ 0";

        // Hide Result

        hideResult();

        // Focus First Input

        loanAmountInput.focus();

    });

    // ==========================================
    // RETURN CALCULATOR
    // ==========================================

    return section;

};