/**
 * ============================================
 * UNIT CONVERTER
 * File: js/pages/calculators/unitConverter.js
 * ============================================
 */

window.GFC_unitConverter = function () {

    // ==========================================
    // PART 1 - HTML TEMPLATE
    // ==========================================

    const section = document.createElement("section");
    section.className = "calculator-section";

    section.innerHTML = `

        <div class="calculator-card">

            <h2>Unit Converter</h2>

            <p class="calculator-description">
                Instantly convert engineering units including
                length, area, volume, weight and pressure.
            </p>

            <div class="calculator-form">

                <!-- Conversion Type -->

                <div class="form-group">

                    <label for="conversionType">
                        Conversion Type
                    </label>

                    <select id="conversionType">

                        <option value="length" selected>
                            Length
                        </option>

                        <option value="area">
                            Area
                        </option>

                        <option value="volume">
                            Volume
                        </option>

                        <option value="weight">
                            Weight
                        </option>

                        <option value="pressure">
                            Pressure
                        </option>

                    </select>

                </div>

                <!-- From Unit -->

                <div class="form-group">

                    <label for="fromUnit">
                        From Unit
                    </label>

                    <select id="fromUnit">

                        <option value="m">
                            Metre (m)
                        </option>

                        <option value="ft">
                            Feet (ft)
                        </option>

                    </select>

                </div>

                <!-- To Unit -->

                <div class="form-group">

                    <label for="toUnit">
                        To Unit
                    </label>

                    <select id="toUnit">

                        <option value="ft">
                            Feet (ft)
                        </option>

                        <option value="m">
                            Metre (m)
                        </option>

                    </select>

                </div>

                <!-- Input Value -->

                <div class="form-group">

                    <label for="inputValue">
                        Value
                    </label>

                    <input
                        type="number"
                        id="inputValue"
                        min="0"
                        step="0.01"
                        placeholder="Enter value">

                </div>

                <!-- Buttons -->

                <div class="calculator-buttons">

                    <button
                        type="button"
                        id="calculateConversion"
                        class="btn btn-primary">

                        Convert

                    </button>

                    <button
                        type="button"
                        id="resetConversion"
                        class="btn btn-secondary">

                        Reset

                    </button>

                </div>

                <!-- Result -->

                <div
                    id="conversionResult"
                    class="calculator-result"
                    style="display:none;">

                    <h3>📐 Conversion Result</h3>

                    <div class="result-grid">

                        <div class="result-item">

                            <span>Converted Value</span>

                            <strong id="convertedValueResult">
                                0
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

    const conversionTypeInput =
        section.querySelector("#conversionType");

    const fromUnitInput =
        section.querySelector("#fromUnit");

    const toUnitInput =
        section.querySelector("#toUnit");

    const inputValueInput =
        section.querySelector("#inputValue");

    // Buttons

    const calculateBtn =
        section.querySelector("#calculateConversion");

    const resetBtn =
        section.querySelector("#resetConversion");

    // Result Container

    const resultBox =
        section.querySelector("#conversionResult");

    // Result Field

    const convertedValueResult =
        section.querySelector("#convertedValueResult");
            // ==========================================
    // PART 3 - CONSTANTS & HELPER FUNCTIONS
    // ==========================================

    // Conversion Factors (Base Units)

    const conversionFactors = {

        length: {
            mm: 0.001,
            cm: 0.01,
            m: 1,
            km: 1000,
            ft: 0.3048,
            in: 0.0254
        },

        area: {
            "m²": 1,
            "ft²": 0.092903,
            acre: 4046.856,
            hectare: 10000
        },

        volume: {
            "m³": 1,
            litre: 0.001,
            gallon: 0.00378541,
            "ft³": 0.0283168
        },

        weight: {
            g: 0.001,
            kg: 1,
            tonne: 1000,
            lb: 0.453592
        },

        pressure: {
            Pa: 1,
            kPa: 1000,
            bar: 100000,
            psi: 6894.76
        }

    };

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

        const category =
            conversionTypeInput.value;

        const fromUnit =
            fromUnitInput.value;

        const toUnit =
            toUnitInput.value;

        const inputValue =
            parseFloat(inputValueInput.value);

        // Validation

        if (
            isNaN(inputValue) ||
            inputValue < 0
        ) {

            alert("Please enter a valid value.");

            inputValueInput.focus();

            return;

        }

        // Get Conversion Table

        const table =
            conversionFactors[category];

        if (
            !table ||
            !table[fromUnit] ||
            !table[toUnit]
        ) {

            alert("Selected units are not supported.");

            return;

        }

        // Convert to Base Unit

        const baseValue =
            inputValue * table[fromUnit];

        // Convert to Target Unit

        const convertedValue =
            baseValue / table[toUnit];

        // Display Result

        convertedValueResult.textContent =
            convertedValue.toFixed(4) +
            " " +
            toUnit;

        // Show Result

        showResult();

    });
        // ==========================================
    // PART 5 - RESET & RETURN
    // ==========================================

    resetBtn.addEventListener("click", () => {

        // Reset Inputs

        conversionTypeInput.value =
            "length";

        fromUnitInput.value =
            "m";

        toUnitInput.value =
            "ft";

        inputValueInput.value =
            "";

        // Reset Result

        convertedValueResult.textContent =
            "0";

        // Hide Result

        hideResult();

        // Focus First Input

        inputValueInput.focus();

    });

    // ==========================================
    // RETURN CALCULATOR
    // ==========================================

    return section;

};