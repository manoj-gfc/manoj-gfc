/**
 * ============================================
 * PAINT CALCULATOR
 * File: js/pages/calculators/paint.js
 * ============================================
 */

window.GFC_paint = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Paint Calculator</h2>

            <p class="calculator-description">
                Calculate paint quantity for walls and ceilings
                based on surface area and number of coats.
            </p>

            <div class="calculator-form">

                <!-- Length -->

                <div class="form-group">

                    <label for="paintLength">
                        Room Length (m)
                    </label>

                    <input
                        type="number"
                        id="paintLength"
                        min="0"
                        step="0.01"
                        placeholder="Enter room length">

                </div>

                <!-- Width -->

                <div class="form-group">

                    <label for="paintWidth">
                        Room Width (m)
                    </label>

                    <input
                        type="number"
                        id="paintWidth"
                        min="0"
                        step="0.01"
                        placeholder="Enter room width">

                </div>

                <!-- Height -->

                <div class="form-group">

                    <label for="paintHeight">
                        Wall Height (m)
                    </label>

                    <input
                        type="number"
                        id="paintHeight"
                        min="0"
                        step="0.01"
                        placeholder="Enter wall height">

                </div>

                <!-- Number of Coats -->

                <div class="form-group">

                    <label for="paintCoats">
                        Number of Coats
                    </label>

                    <select id="paintCoats">

                        <option value="1">1 Coat</option>

                        <option value="2" selected>
                            2 Coats
                        </option>

                        <option value="3">
                            3 Coats
                        </option>

                    </select>

                </div>

                <!-- Paint Coverage -->

                <div class="form-group">

                    <label for="paintCoverage">
                        Paint Coverage (m²/L)
                    </label>

                    <input
                        type="number"
                        id="paintCoverage"
                        min="1"
                        step="0.1"
                        value="10">

                </div>

                <!-- Paint Price -->

                <div class="form-group">

                    <label for="paintPrice">
                        Paint Price (₹/Litre)
                    </label>

                    <input
                        type="number"
                        id="paintPrice"
                        min="0"
                        step="1"
                        value="350">

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculatePaint"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetPaint"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="paintResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>🎨 Paint Estimation</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>📐 Paint Area</span>

                            <strong id="paintAreaResult">
                                0.00 m²
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🪣 Paint Required</span>

                            <strong id="paintQuantityResult">
                                0.00 Litres
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>💰 Estimated Cost</span>

                            <strong id="paintCostResult">
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

    const lengthInput =
        section.querySelector("#paintLength");

    const widthInput =
        section.querySelector("#paintWidth");

    const heightInput =
        section.querySelector("#paintHeight");

    const coatsInput =
        section.querySelector("#paintCoats");

    const coverageInput =
        section.querySelector("#paintCoverage");

    const priceInput =
        section.querySelector("#paintPrice");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculatePaint");

    const resetBtn =
        section.querySelector("#resetPaint");

    // Result Container

    const resultBox =
        section.querySelector("#paintResult");

    // Result Fields

    const paintAreaResult =
        section.querySelector("#paintAreaResult");

    const paintQuantityResult =
        section.querySelector("#paintQuantityResult");

    const paintCostResult =
        section.querySelector("#paintCostResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Default Values

    const DEFAULT_COVERAGE = 10;     // m² per litre

    const DEFAULT_PRICE = 350;       // ₹ per litre

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

        const length =
            parseFloat(lengthInput.value);

        const width =
            parseFloat(widthInput.value);

        const height =
            parseFloat(heightInput.value);

        const coats =
            parseInt(coatsInput.value);

        const coverage =
            parseFloat(coverageInput.value);

        const price =
            parseFloat(priceInput.value);

        // Validation

        if (
            isNaN(length) ||
            isNaN(width) ||
            isNaN(height) ||
            isNaN(coats) ||
            isNaN(coverage) ||
            isNaN(price) ||
            length <= 0 ||
            width <= 0 ||
            height <= 0 ||
            coverage <= 0 ||
            price < 0
        ) {

            alert("Please enter valid values.");

            lengthInput.focus();

            return;

        }

        // Wall Area

        const wallArea =
            2 * (length + width) * height;

        // Ceiling Area

        const ceilingArea =
            length * width;

        // Total Paint Area

        const totalArea =
            (wallArea + ceilingArea) * coats;

        // Paint Quantity

        const paintRequired =
            totalArea / coverage;

        // Estimated Cost

        const totalCost =
            paintRequired * price;

        // Display Results

        paintAreaResult.textContent =
            totalArea.toFixed(2) + " m²";

        paintQuantityResult.textContent =
            paintRequired.toFixed(2) + " Litres";

        paintCostResult.textContent =
            formatCurrency(totalCost);

        // Show Result

        showResult();

    });
        // ==========================================
    // PART 5 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Inputs

        lengthInput.value = "";

        widthInput.value = "";

        heightInput.value = "";

        coatsInput.value = "2";

        coverageInput.value = DEFAULT_COVERAGE;

        priceInput.value = DEFAULT_PRICE;

        // Reset Results

        paintAreaResult.textContent =
            "0.00 m²";

        paintQuantityResult.textContent =
            "0.00 Litres";

        paintCostResult.textContent =
            "₹ 0";

        // Hide Result

        hideResult();

        // Focus First Input

        lengthInput.focus();

    });

    // ==========================================
    // RETURN CALCULATOR
    // ==========================================

    return section;

};
