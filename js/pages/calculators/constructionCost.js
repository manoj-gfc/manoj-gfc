/**
 * ============================================
 * CONSTRUCTION COST ESTIMATOR
 * File: js/pages/calculators/constructionCost.js
 * ============================================
 */

window.GFC_constructionCost = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Construction Cost Estimator</h2>

            <p class="calculator-description">
                Estimate total construction cost based on
                building area, construction quality and
                number of floors.
            </p>

            <div class="calculator-form">

                <!-- Building Area -->

                <div class="form-group">

                    <label for="buildingArea">
                        Building Area (sq.ft)
                    </label>

                    <input
                        type="number"
                        id="buildingArea"
                        min="1"
                        step="1"
                        placeholder="Enter building area">

                </div>

                <!-- Construction Quality -->

                <div class="form-group">

                    <label for="constructionQuality">
                        Construction Quality
                    </label>

                    <select id="constructionQuality">

                        <option value="economy">
                            Economy
                        </option>

                        <option value="standard" selected>
                            Standard
                        </option>

                        <option value="premium">
                            Premium
                        </option>

                    </select>

                </div>

                <!-- Number of Floors -->

                <div class="form-group">

                    <label for="numberOfFloors">
                        Number of Floors
                    </label>

                    <select id="numberOfFloors">

                        <option value="1">
                            Ground Floor
                        </option>

                        <option value="2">
                            Ground + 1
                        </option>

                        <option value="3">
                            Ground + 2
                        </option>

                        <option value="4">
                            Ground + 3
                        </option>

                    </select>

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculateConstructionCost"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetConstructionCost"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="constructionCostResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>📊 Estimation Result</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>🏠 Building Area</span>

                            <strong id="areaResult">
                                0 sq.ft
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🏗️ Construction Quality</span>

                            <strong id="qualityResult">
                                Standard
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🏢 Floors</span>

                            <strong id="floorResult">
                                1
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>💰 Estimated Cost</span>

                            <strong id="estimatedCostResult">
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

    const areaInput =
        section.querySelector("#buildingArea");

    const qualityInput =
        section.querySelector("#constructionQuality");

    const floorInput =
        section.querySelector("#numberOfFloors");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculateConstructionCost");

    const resetBtn =
        section.querySelector("#resetConstructionCost");

    // Result Container

    const resultBox =
        section.querySelector("#constructionCostResult");

    // Result Fields

    const areaResult =
        section.querySelector("#areaResult");

    const qualityResult =
        section.querySelector("#qualityResult");

    const floorResult =
        section.querySelector("#floorResult");

    const estimatedCostResult =
        section.querySelector("#estimatedCostResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Construction Cost Per Sq.ft (₹)

    const COST_RATES = {

        economy: 1800,

        standard: 2200,

        premium: 2800

    };

    // ==========================================
    // FORMAT CURRENCY
    // ==========================================

    function formatCurrency(amount) {

        return "₹ " + amount.toLocaleString("en-IN");

    }

    // ==========================================
    // GET QUALITY NAME
    // ==========================================

    function getQualityName(value) {

        switch (value) {

            case "economy":
                return "Economy";

            case "premium":
                return "Premium";

            default:
                return "Standard";

        }

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

        const area = parseFloat(areaInput.value);

        const quality = qualityInput.value;

        const floors = parseInt(floorInput.value);

        // Validation

        if (

            isNaN(area) ||

            area <= 0

        ) {

            alert("Please enter a valid building area.");

            areaInput.focus();

            return;

        }

        // Cost Per Sq.ft

        const rate = COST_RATES[quality];

        // Total Cost

        const estimatedCost =
            area * rate * floors;

        // Display Results

        areaResult.textContent =
            area.toLocaleString("en-IN") + " sq.ft";

        qualityResult.textContent =
            getQualityName(quality);

        floorResult.textContent =
            floors;

        estimatedCostResult.textContent =
            formatCurrency(estimatedCost);

        // Show Result

        showResult();

    });

    // ==========================================
    // PART 5 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Inputs

        areaInput.value = "";

        qualityInput.value = "standard";

        floorInput.value = "1";

        // Reset Results

        areaResult.textContent =
            "0 sq.ft";

        qualityResult.textContent =
            "Standard";

        floorResult.textContent =
            "1";

        estimatedCostResult.textContent =
            "₹ 0";

        // Hide Result

        hideResult();

        // Focus First Input

        areaInput.focus();

    });

    // ==========================================
    // RETURN CALCULATOR
    // ==========================================

    return section;

};