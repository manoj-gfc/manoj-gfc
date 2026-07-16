/**
 * ============================================
 * CEMENT BAGS CALCULATOR
 * File: js/pages/calculators/cementBags.js
 * ============================================
 */

window.GFC_cementBags = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Cement Bags Calculator</h2>

            <p class="calculator-description">
                Determine the number of cement bags required
                for concrete, mortar, plaster and flooring work.
            </p>

            <div class="calculator-form">

                <!-- Work Type -->

                <div class="form-group">

                    <label for="cementWorkType">
                        Work Type
                    </label>

                    <select id="cementWorkType">

                        <option value="concrete" selected>
                            Concrete
                        </option>

                        <option value="mortar">
                            Mortar
                        </option>

                        <option value="plaster">
                            Plaster
                        </option>

                    </select>

                </div>

                <!-- Volume -->

                <div class="form-group">

                    <label for="cementVolume">
                        Volume (m³)
                    </label>

                    <input
                        type="number"
                        id="cementVolume"
                        min="0"
                        step="0.01"
                        placeholder="Enter volume">

                </div>

                <!-- Mix Ratio -->

                <div class="form-group">

                    <label for="cementMix">
                        Mix Ratio
                    </label>

                    <select id="cementMix">

                        <option value="1:2:4">
                            1 : 2 : 4
                        </option>

                        <option value="1:1.5:3" selected>
                            1 : 1.5 : 3
                        </option>

                        <option value="1:1:2">
                            1 : 1 : 2
                        </option>

                    </select>

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculateCement"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetCement"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="cementResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>🧱 Cement Estimation</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>🧱 Cement Bags</span>

                            <strong id="bagsResult">
                                0 Bags
                            </strong>

                        </div>

                        <div class="result-item">

                            <span>⚖️ Cement Weight</span>

                            <strong id="cementWeightResult">
                                0 kg
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

    const volumeInput =
        section.querySelector("#cementVolume");

    const mixInput =
        section.querySelector("#cementMix");

    const workTypeInput =
        section.querySelector("#cementWorkType");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculateCement");

    const resetBtn =
        section.querySelector("#resetCement");

    // Result Container

    const resultBox =
        section.querySelector("#cementResult");

    // Result Fields

    const bagsResult =
        section.querySelector("#bagsResult");

    const cementWeightResult =
        section.querySelector("#cementWeightResult");

    const estimatedCostResult =
        section.querySelector("#estimatedCostResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Cement Constants

    const CEMENT_BAG_WEIGHT = 50;      // kg
    const CEMENT_BAG_VOLUME = 0.0347;  // m³

    // Mix Ratios

    const MIX_RATIOS = {

        "1:2:4": {
            cement: 1,
            sand: 2,
            aggregate: 4
        },

        "1:1.5:3": {
            cement: 1,
            sand: 1.5,
            aggregate: 3
        },

        "1:1:2": {
            cement: 1,
            sand: 1,
            aggregate: 2
        }

    };

    // Cement Price (Optional)

    const CEMENT_PRICE = 450;

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

        const volume =
            parseFloat(volumeInput.value);

        const mix =
            mixInput.value;

        const workType =
            workTypeInput.value;

        // Validation

        if (
            isNaN(volume) ||
            volume <= 0
        ) {

            alert("Please enter a valid volume.");

            volumeInput.focus();

            return;

        }

        // Dry Volume Factor

        let dryVolumeFactor = 1.54;

        if (workType === "plaster") {

            dryVolumeFactor = 1.27;

        } else if (workType === "mortar") {

            dryVolumeFactor = 1.33;

        }

        const dryVolume =
            volume * dryVolumeFactor;

        // Mix Ratio

        const ratio =
            MIX_RATIOS[mix];

        const totalParts =
            ratio.cement +
            ratio.sand +
            ratio.aggregate;

        // Cement Volume

        const cementVolume =
            (dryVolume * ratio.cement) /
            totalParts;

        // Cement Bags

        const cementBags =
            cementVolume /
            CEMENT_BAG_VOLUME;

        // Cement Weight

        const cementWeight =
            cementBags *
            CEMENT_BAG_WEIGHT;

        // Estimated Cost

        const estimatedCost =
            cementBags *
            CEMENT_PRICE;

        // Display Results

        bagsResult.textContent =
            cementBags.toFixed(1) + " Bags";

        cementWeightResult.textContent =
            cementWeight.toFixed(0) + " kg";

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

        volumeInput.value = "";

        mixInput.value = "1:1.5:3";

        workTypeInput.value = "concrete";

        // Reset Results

        bagsResult.textContent =
            "0 Bags";

        cementWeightResult.textContent =
            "0 kg";

        estimatedCostResult.textContent =
            "₹ 0";

        // Hide Result

        hideResult();

        // Focus First Input

        volumeInput.focus();

    });

    // ==========================================
    // RETURN CALCULATOR
    // ==========================================

    return section;

};