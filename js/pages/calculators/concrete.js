/**
 * ============================================
 * CONCRETE VOLUME CALCULATOR
 * File: js/pages/calculators/concrete.js
 * ============================================
 */

window.GFC_concrete = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `
        <div class="calculator-card">

            <h2>Concrete Volume Calculator</h2>

            <p class="calculator-description">
                Calculate concrete volume and estimate cement,
                sand, aggregate, water and material cost.
            </p>

            <div class="calculator-form">

                <!-- Concrete Element -->

                <div class="form-group">

                    <label for="concreteShape">
                        Concrete Element
                    </label>

                    <select id="concreteShape">

                        <option value="slab">
                            Slab
                        </option>

                        <option value="beam">
                            Beam
                        </option>

                        <option value="column">
                            Column
                        </option>

                        <option value="footing">
                            Footing
                        </option>

                    </select>

                </div>

                <!-- Length -->

                <div class="form-group">

                    <label for="concreteLength">
                        Length (m)
                    </label>

                    <input
                        type="number"
                        id="concreteLength"
                        min="0"
                        step="0.01"
                        placeholder="Enter Length">

                </div>

                <!-- Width -->

                <div class="form-group">

                    <label for="concreteWidth">
                        Width (m)
                    </label>

                    <input
                        type="number"
                        id="concreteWidth"
                        min="0"
                        step="0.01"
                        placeholder="Enter Width">

                </div>

                <!-- Height -->

                <div class="form-group">

                    <label for="concreteHeight">
                        Thickness / Height (m)
                    </label>

                    <input
                        type="number"
                        id="concreteHeight"
                        min="0"
                        step="0.01"
                        placeholder="Enter Thickness">

                </div>

                <!-- Concrete Grade -->

                <div class="form-group">

                    <label for="concreteGrade">
                        Concrete Grade
                    </label>

                    <select id="concreteGrade">

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
                        id="calculateConcrete"
                        class="btn btn-primary">

                        Calculate

                    </button>

                    <button
                        type="button"
                        id="resetConcrete"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="concreteResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>📊 Calculation Result</h3>

                    <div class="result-grid">

                        <div class="result-item">
                            <span>📦 Concrete Volume</span>
                            <strong id="volumeResult">
                                0.000 m³
                            </strong>
                        </div>

                        <div class="result-item">
                            <span>🧱 Cement Bags</span>
                            <strong id="cementResult">
                                0 Bags
                            </strong>
                        </div>

                        <div class="result-item">
                            <span>🏖️ Sand</span>
                            <strong id="sandResult">
                                0.000 m³
                            </strong>
                        </div>

                        <div class="result-item">
                            <span>🪨 Aggregate</span>
                            <strong id="aggregateResult">
                                0.000 m³
                            </strong>
                        </div>

                        <div class="result-item">
                            <span>💧 Water</span>
                            <strong id="waterResult">
                                0 Litres
                            </strong>
                        </div>

                        <div class="result-item total-result">
                            <span>💰 Estimated Material Cost</span>
                            <strong id="costResult">
                                ₹ 0
                            </strong>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    `;
        // ==========================================
    // PART 2 - DOM ELEMENTS & CONSTANTS
    // ==========================================

    // DOM Elements

    const shapeInput = section.querySelector("#concreteShape");

    const lengthInput = section.querySelector("#concreteLength");
    const widthInput = section.querySelector("#concreteWidth");
    const heightInput = section.querySelector("#concreteHeight");

    const gradeInput = section.querySelector("#concreteGrade");

    const calculateBtn = section.querySelector("#calculateConcrete");
    const resetBtn = section.querySelector("#resetConcrete");

    const resultBox = section.querySelector("#concreteResult");

    const volumeResult = section.querySelector("#volumeResult");
    const cementResult = section.querySelector("#cementResult");
    const sandResult = section.querySelector("#sandResult");
    const aggregateResult = section.querySelector("#aggregateResult");
    const waterResult = section.querySelector("#waterResult");
    const costResult = section.querySelector("#costResult");

    // ==========================================
    // CONSTANTS
    // ==========================================

    const MATERIAL_PRICE = {

        cement: 450,      // ₹ per bag

        sand: 1800,       // ₹ per m³

        aggregate: 1500   // ₹ per m³

    };

    // ==========================================
    // CONCRETE MIX RATIOS
    // ==========================================

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
    // PART 3 - CALCULATION LOGIC
    // ==========================================

    calculateBtn.addEventListener("click", () => {

        const length = parseFloat(lengthInput.value);
        const width = parseFloat(widthInput.value);
        const height = parseFloat(heightInput.value);

        // Validation

        if (
            isNaN(length) ||
            isNaN(width) ||
            isNaN(height) ||
            length <= 0 ||
            width <= 0 ||
            height <= 0
        ) {
            alert("Please enter valid dimensions.");
            return;
        }

        // Wet Concrete Volume

        const volume = length * width * height;

        // Dry Volume

        const dryVolume = volume * 1.54;

        // Selected Mix Ratio

        const mix = MIX_RATIOS[gradeInput.value];

        // Total Mix Parts

        const totalParts =
            mix.cement +
            mix.sand +
            mix.aggregate;

        // Material Volumes

        const cementVolume =
            (dryVolume * mix.cement) / totalParts;

        const sandVolume =
            (dryVolume * mix.sand) / totalParts;

        const aggregateVolume =
            (dryVolume * mix.aggregate) / totalParts;

        // Cement Bags

        const cementBags =
            cementVolume / 0.0347;

        // Water Requirement

        const water =
            cementBags * 25;

        // Estimated Material Cost

        const estimatedCost =
            (cementBags * MATERIAL_PRICE.cement) +
            (sandVolume * MATERIAL_PRICE.sand) +
            (aggregateVolume * MATERIAL_PRICE.aggregate);

        // Display Results

        volumeResult.textContent =
            volume.toFixed(3) + " m³";

        cementResult.textContent =
            cementBags.toFixed(1) + " Bags";

        sandResult.textContent =
            sandVolume.toFixed(3) + " m³";

        aggregateResult.textContent =
            aggregateVolume.toFixed(3) + " m³";

        waterResult.textContent =
            water.toFixed(0) + " Litres";

        costResult.textContent =
            "₹ " + estimatedCost.toLocaleString("en-IN", {
                maximumFractionDigits: 0
            });

        resultBox.style.display = "block";

        resultBox.scrollIntoView({

            behavior: "smooth",

            block: "nearest"

        });

    });
        // ==========================================
    // PART 4 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Form

        shapeInput.value = "slab";

        lengthInput.value = "";
        widthInput.value = "";
        heightInput.value = "";

        gradeInput.value = "M20";

        // Reset Results

        volumeResult.textContent = "0.000 m³";

        cementResult.textContent = "0 Bags";

        sandResult.textContent = "0.000 m³";

        aggregateResult.textContent = "0.000 m³";

        waterResult.textContent = "0 Litres";

        costResult.textContent = "₹ 0";

        // Hide Result Box

        resultBox.style.display = "none";

        // Focus First Input

        lengthInput.focus();

    });

    // ==========================================
    // RETURN CALCULATOR
    // ==========================================

    return section;

};