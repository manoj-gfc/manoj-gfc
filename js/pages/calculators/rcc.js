/**
 * ============================================
 * RCC MATERIAL CALCULATOR
 * File: js/pages/calculators/rcc.js
 * ============================================
 */

window.GFC_rcc = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>RCC Material Calculator</h2>

            <p class="calculator-description">
                Estimate cement, sand, aggregate and steel
                required for reinforced concrete (RCC) work.
            </p>

            <div class="calculator-form">

                <!-- Length -->

                <div class="form-group">

                    <label for="rccLength">
                        Length (m)
                    </label>

                    <input
                        type="number"
                        id="rccLength"
                        min="0"
                        step="0.01"
                        placeholder="Enter length">

                </div>

                <!-- Width -->

                <div class="form-group">

                    <label for="rccWidth">
                        Width (m)
                    </label>

                    <input
                        type="number"
                        id="rccWidth"
                        min="0"
                        step="0.01"
                        placeholder="Enter width">

                </div>

                <!-- Thickness -->

                <div class="form-group">

                    <label for="rccThickness">
                        Thickness (m)
                    </label>

                    <input
                        type="number"
                        id="rccThickness"
                        min="0"
                        step="0.01"
                        placeholder="Enter thickness">

                </div>

                <!-- Concrete Grade -->

                <div class="form-group">

                    <label for="rccGrade">
                        Concrete Grade
                    </label>

                    <select id="rccGrade">

                        <option value="M15">
                            M15 (1 : 2 : 4)
                        </option>

                        <option value="M20" selected>
                            M20 (1 : 1.5 : 3)
                        </option>

                        <option value="M25">
                            M25 (1 : 1 : 2)
                        </option>

                    </select>

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculateRcc"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetRcc"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="rccResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>🏗️ RCC Material Estimation</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>📦 Concrete Volume</span>

                            <strong id="rccVolumeResult">
                                0.000 m³
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🧱 Cement Bags</span>

                            <strong id="rccCementResult">
                                0 Bags
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🏖️ Sand</span>

                            <strong id="rccSandResult">
                                0.000 m³
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🪨 Aggregate</span>

                            <strong id="rccAggregateResult">
                                0.000 m³
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>🔩 Steel</span>

                            <strong id="rccSteelResult">
                                0.00 kg
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
        section.querySelector("#rccLength");

    const widthInput =
        section.querySelector("#rccWidth");

    const thicknessInput =
        section.querySelector("#rccThickness");

    const gradeInput =
        section.querySelector("#rccGrade");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculateRcc");

    const resetBtn =
        section.querySelector("#resetRcc");

    // Result Container

    const resultBox =
        section.querySelector("#rccResult");

    // Result Fields

    const volumeResult =
        section.querySelector("#rccVolumeResult");

    const cementResult =
        section.querySelector("#rccCementResult");

    const sandResult =
        section.querySelector("#rccSandResult");

    const aggregateResult =
        section.querySelector("#rccAggregateResult");

    const steelResult =
        section.querySelector("#rccSteelResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Material Prices (₹)

    const MATERIAL_PRICE = {

        cement: 450,      // Per Bag

        sand: 1800,       // Per m³

        aggregate: 1500,  // Per m³

        steel: 75         // Per kg

    };

    // Concrete Mix Ratios

    const MIX_RATIOS = {

        M15: {

            cement: 1,

            sand: 2,

            aggregate: 4

        },

        M20: {

            cement: 1,

            sand: 1.5,

            aggregate: 3

        },

        M25: {

            cement: 1,

            sand: 1,

            aggregate: 2

        }

    };

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

        const thickness =
            parseFloat(thicknessInput.value);

        const grade =
            gradeInput.value;

        // Validation

        if (
            isNaN(length) ||
            isNaN(width) ||
            isNaN(thickness) ||
            length <= 0 ||
            width <= 0 ||
            thickness <= 0
        ) {

            alert("Please enter valid dimensions.");

            lengthInput.focus();

            return;

        }

        // Concrete Volume

        const volume =
            length * width * thickness;

        // Dry Volume

        const dryVolume =
            volume * 1.54;

        // Selected Mix Ratio

        const mix =
            MIX_RATIOS[grade];

        const totalParts =
            mix.cement +
            mix.sand +
            mix.aggregate;

        // Material Quantities

        const cementVolume =
            (dryVolume * mix.cement) / totalParts;

        const sandVolume =
            (dryVolume * mix.sand) / totalParts;

        const aggregateVolume =
            (dryVolume * mix.aggregate) / totalParts;

        // Cement Bags

        const cementBags =
            cementVolume / 0.0347;

        // Steel Quantity
        // Approx. 80 kg per m³ of RCC

        const steelWeight =
            volume * 80;

        // Display Results

        volumeResult.textContent =
            volume.toFixed(3) + " m³";

        cementResult.textContent =
            cementBags.toFixed(1) + " Bags";

        sandResult.textContent =
            sandVolume.toFixed(3) + " m³";

        aggregateResult.textContent =
            aggregateVolume.toFixed(3) + " m³";

        steelResult.textContent =
            steelWeight.toFixed(2) + " kg";

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

        thicknessInput.value = "";

        gradeInput.value = "M20";

        // Reset Results

        volumeResult.textContent =
            "0.000 m³";

        cementResult.textContent =
            "0 Bags";

        sandResult.textContent =
            "0.000 m³";

        aggregateResult.textContent =
            "0.000 m³";

        steelResult.textContent =
            "0.00 kg";

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