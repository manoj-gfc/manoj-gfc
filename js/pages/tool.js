// ============================================
// js/pages/tool.js - Tools Page Specific
// https://www.gfcbuilder.com
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. CONSTRUCTION COST ESTIMATOR
    // ==========================================
    const calcCostBtn = document.getElementById('calcCostBtn');
    if (calcCostBtn) {
        calcCostBtn.addEventListener('click', function () {

            const area = parseFloat(document.getElementById('builtUpArea').value);
            const quality = parseFloat(document.getElementById('constructionQuality').value);

            if (!area || area <= 0) {
                alert('Please enter a valid built-up area.');
                return;
            }

            const totalCost = area * quality;
            const cementBags = Math.round(area * 0.85);
            const steelTons = (area * 4.5 / 1000).toFixed(2);
            const sandBrass = (area * 0.018).toFixed(2);
            const aggregateBrass = (area * 0.025).toFixed(2);
            const bricks = Math.round(area * 11);

            document.getElementById('resTotalCost').textContent = '₹ ' + totalCost.toLocaleString();
            document.getElementById('resCementQty').textContent = cementBags + ' Bags';
            document.getElementById('resSteelQty').textContent = steelTons + ' Tons';
            document.getElementById('resSandQty').textContent = sandBrass + ' Brass';
            document.getElementById('resAggregateQty').textContent = aggregateBrass + ' Brass';
            document.getElementById('resBricksQty').textContent = bricks + ' Nos';
        });
    }

    // ==========================================
    // 2. AREA CONVERTER
    // ==========================================
    const convertBtn = document.getElementById('convertBtn');
    if (convertBtn) {
        convertBtn.addEventListener('click', function () {

            const value = parseFloat(document.getElementById('unitValue').value);
            const fromUnit = document.getElementById('fromUnit').value;
            const toUnit = document.getElementById('toUnit').value;
            const resultEl = document.getElementById('unitResult');

            if (!value || value <= 0) {
                resultEl.textContent = 'Please enter a valid value.';
                return;
            }

            const toSqft = {
                sqft: 1,
                cent: 435.6,
                sqm: 10.764,
                acre: 43560
            };

            const sqftValue = value * toSqft[fromUnit];
            const result = sqftValue / toSqft[toUnit];

            resultEl.textContent = `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
        });
    }

    // ==========================================
    // 3. HOME LOAN EMI CALCULATOR
    // ==========================================
    const calcLoanBtn = document.getElementById('calcLoanBtn');
    if (calcLoanBtn) {
        calcLoanBtn.addEventListener('click', function () {

            const principal = parseFloat(document.getElementById('loanAmount').value);
            const rate = parseFloat(document.getElementById('loanInterest').value) / 100 / 12;
            const tenure = parseFloat(document.getElementById('loanTenure').value) * 12;
            const monthlyIncome = parseFloat(document.getElementById('monthlyIncome').value);

            if (!principal || !rate || !tenure || !monthlyIncome) {
                alert('Please fill in all fields.');
                return;
            }

            const emi = principal * rate * Math.pow(1 + rate, tenure) /
                (Math.pow(1 + rate, tenure) - 1);

            const totalPayment = emi * tenure;
            const totalInterest = totalPayment - principal;

            document.getElementById('resLoanEMI').textContent = '₹ ' + Math.round(emi).toLocaleString();
            document.getElementById('resTotalInterest').textContent = '₹ ' + Math.round(totalInterest).toLocaleString();

            const eligibility = (emi <= monthlyIncome * 0.4)
                ? '✅ Eligible'
                : '❌ Not Eligible';

            document.getElementById('resLoanEligibility').textContent = eligibility;
        });
    }

    // ==========================================
    // 4. VASTU CHECKER
    // ==========================================
    const checkVastuBtn = document.getElementById('checkVastuBtn');
    if (checkVastuBtn) {
        checkVastuBtn.addEventListener('click', function () {

            const room = document.getElementById('vastu-room').value;
            const direction = document.getElementById('vastu-direction').value;
            const output = document.getElementById('vastu-output');

            if (!room || !direction) {
                output.textContent = 'Please select both room and direction.';
                return;
            }

            const vastuRules = {
                kitchen: { NE: 'Good', E: 'Good', SE: 'Good', S: 'Average', SW: 'Avoid', W: 'Avoid', NW: 'Average', N: 'Good' },
                pooja: { NE: 'Best', E: 'Good', N: 'Good', SE: 'Avoid', S: 'Avoid', SW: 'Avoid', W: 'Avoid', NW: 'Avoid' },
                master_bedroom: { SW: 'Best', S: 'Good', W: 'Good', SE: 'Average', N: 'Avoid', NE: 'Avoid', E: 'Avoid', NW: 'Avoid' },
                toilet: { NW: 'Good', W: 'Good', S: 'Good', SE: 'Good', N: 'Avoid', NE: 'Avoid', E: 'Avoid', SW: 'Avoid' }
            };

            const roomData = vastuRules[room];

            if (!roomData) {
                output.textContent = 'Invalid room selection.';
                return;
            }

            const result = roomData[direction] || 'Not Recommended';

            const emojis = {
                Best: '🌟',
                Good: '✅',
                Average: '⚠️',
                Avoid: '❌'
            };

            const emoji = emojis[result] || '❓';

            const roomNames = {
                kitchen: 'Kitchen',
                pooja: 'Pooja Room',
                master_bedroom: 'Master Bedroom',
                toilet: 'Toilet / Bathroom'
            };

            output.innerHTML = `
                <strong>${roomNames[room]}</strong> facing <strong>${direction}</strong><br>
                Vastu Rating: ${emoji} <strong>${result}</strong>
            `;
        });
    }

    // ==========================================
    // 5. PLASTER MATERIAL CALCULATOR
    // ==========================================
    const calcPlasterBtn = document.getElementById('calcPlasterBtn');
    if (calcPlasterBtn) {
        calcPlasterBtn.addEventListener('click', function () {

            const area = parseFloat(document.getElementById('plasterArea').value);
            const thickness = parseFloat(document.getElementById('thickness').value);
            const result = document.getElementById('plasterResult');

            if (!area || !thickness || area <= 0 || thickness <= 0) {
                result.textContent = 'Please enter valid area and thickness.';
                return;
            }

            const volume = (area * thickness) / 12;
            const cementBags = Math.round(volume * 1.25);
            const sandCft = (volume * 4.5).toFixed(2);

            result.innerHTML = `
                <strong>Plaster Quantity:</strong><br>
                Cement: ${cementBags} Bags<br>
                Sand: ${sandCft} Cft
            `;
        });
    }

    // ==========================================
    // 6. FLOOR TILES CALCULATOR
    // ==========================================
    const calcTileBtn = document.getElementById('calcTileBtn');
    if (calcTileBtn) {
        calcTileBtn.addEventListener('click', function () {

            const area = parseFloat(document.getElementById('floorArea').value);
            const tileSize = parseFloat(document.getElementById('tileSize').value);
            const result = document.getElementById('tileResult');

            if (!area || area <= 0) {
                result.textContent = 'Please enter a valid floor area.';
                return;
            }

            const tilesNeeded = Math.ceil(area / tileSize * 1.05);

            result.innerHTML = `
                <strong>Tile Requirement:</strong><br>
                Tiles Needed: ${tilesNeeded} Pieces<br>
                Wastage Included: 5%
            `;
        });
    }

    // ==========================================
    // 7. PAINT QUANTITY ESTIMATOR
    // ==========================================
    const calcPaintBtn = document.getElementById('calcPaintBtn');
    if (calcPaintBtn) {
        calcPaintBtn.addEventListener('click', function () {

            const area = parseFloat(document.getElementById('paintArea').value);
            const coats = parseInt(document.getElementById('coatCount').value);
            const result = document.getElementById('paintResult');

            if (!area || area <= 0) {
                result.textContent = 'Please enter a valid area.';
                return;
            }

            const liters = (area / 100) * coats;

            result.innerHTML = `
                <strong>Paint Required:</strong><br>
                ${liters.toFixed(2)} Liters (${coats} ${coats > 1 ? 'Coats' : 'Coat'})
            `;
        });
    }

    // ==========================================
    // 8. CONSTRUCTION PROGRESS CHECKLIST
    // ==========================================
    const saveChecklistBtn = document.getElementById('saveChecklistBtn');

    if (saveChecklistBtn) {

        saveChecklistBtn.addEventListener('click', function () {

            const items = document.querySelectorAll('.checkItem');
            let completed = 0;

            items.forEach(item => {
                if (item.checked) completed++;
            });

            const total = items.length;
            const percentage = Math.round((completed / total) * 100);
            const msg = document.getElementById('checklistMsg');

            msg.innerHTML = `
                <strong>Progress Saved!</strong><br>
                ${completed}/${total} tasks completed (${percentage}%)
            `;

            const checklistData = {};
            items.forEach(item => {
                const label = item.parentElement.textContent.trim();
                checklistData[label] = item.checked;
            });

            localStorage.setItem('gfcChecklist', JSON.stringify(checklistData));
        });

        const saved = localStorage.getItem('gfcChecklist');

        if (saved) {
            try {
                const data = JSON.parse(saved);
                const items = document.querySelectorAll('.checkItem');

                items.forEach(item => {
                    const label = item.parentElement.textContent.trim();
                    if (data[label] !== undefined) {
                        item.checked = data[label];
                    }
                });
            } catch (e) {
                console.log('No saved checklist data.');
            }
        }
    }

    // ==========================================
    // 9. ARCHITECTURAL PROMPT GENERATOR
    // ==========================================
    const generatePromptBtn = document.getElementById('generatePromptBtn');

    if (generatePromptBtn) {

        generatePromptBtn.addEventListener('click', function () {

            const style = document.getElementById('renderStyle').value;
            const container = document.getElementById('promptContainer');
            const display = document.getElementById('promptDisplay');

            const prompt =
                `Architectural rendering of a ${style}. High quality, photorealistic, 8K, detailed, professional architecture photography, cinematic lighting, modern design.`;

            display.textContent = prompt;
            container.style.display = 'block';
            container.style.animation = 'fadeIn 0.3s ease';
        });

        const copyPromptBtn = document.getElementById('copyPromptBtn');

        if (copyPromptBtn) {

            copyPromptBtn.addEventListener('click', function () {

                const text = document.getElementById('promptDisplay').textContent;

                if (text && text !== '') {

                    navigator.clipboard.writeText(text).then(() => {

                        this.textContent = 'Copied!';

                        setTimeout(() => {
                            this.textContent = 'Copy Prompt';
                        }, 2000);

                    }).catch(() => {

                        const range = document.createRange();
                        const selection = window.getSelection();

                        range.selectNodeContents(document.getElementById('promptDisplay'));

                        selection.removeAllRanges();
                        selection.addRange(range);

                        document.execCommand('copy');

                        this.textContent = 'Copied!';

                        setTimeout(() => {
                            this.textContent = 'Copy Prompt';
                        }, 2000);
                    });
                }
            });
        }
    }

    // ==========================================
    // 10. WATER TANK CAPACITY CALCULATOR
    // ==========================================
    const calcTankBtn = document.getElementById('calcTankBtn');

    if (calcTankBtn) {

        calcTankBtn.addEventListener('click', function () {

            const members = parseInt(document.getElementById('familyMembers').value);
            const days = parseInt(document.getElementById('tankType').value);

            if (!members || members <= 0) {
                alert('Please enter number of family members.');
                return;
            }

            const dailyWater = members * 135;
            const totalCapacity = dailyWater * days;

            document.getElementById('resDailyWater').textContent = dailyWater + ' Liters';
            document.getElementById('resTotalCapacity').textContent = totalCapacity + ' Liters';

            const depth = 6;
            const width = Math.ceil(Math.sqrt(totalCapacity / (28.3168 * 2 * depth)));
            const length = width * 2;

            document.getElementById('resTankDimensions').textContent =
                `${length}ft x ${width}ft x ${depth}ft`;
        });
    }

    // ==========================================
    // 11. SOLAR PANEL ESTIMATOR
    // ==========================================
    const calcSolarBtn = document.getElementById('calcSolarBtn');

    if (calcSolarBtn) {

        calcSolarBtn.addEventListener('click', function () {

            const bill = parseFloat(document.getElementById('ebBill').value);

            if (!bill || bill <= 0) {
                alert('Please enter your monthly electricity bill.');
                return;
            }

            const plantSize = (bill / 1000).toFixed(1);
            const space = Math.round(plantSize * 100);
            const savings = Math.round(bill * 12 * 0.7);

            document.getElementById('resSolarSize').textContent = plantSize + ' kW';
            document.getElementById('resSolarSpace').textContent = space + ' sq.ft';
            document.getElementById('resSolarSavings').textContent = '₹ ' + savings.toLocaleString();
        });
    }

    // ==========================================
    // 12. RCC MATERIAL ESTIMATOR
    // ==========================================
    const calcRccBtn = document.getElementById('calcRccBtn');

    if (calcRccBtn) {

        calcRccBtn.addEventListener('click', function () {

            const area = parseFloat(document.getElementById('rccArea').value);
            const type = document.getElementById('buildingType').value;
            const result = document.getElementById('steelResult');

            if (!area || area <= 0) {
                result.textContent = 'Please enter a valid RCC area.';
                return;
            }

            const steelRate = type === 'commercial' ? 5.5 : 4.5;
            const steel = (area * steelRate / 1000).toFixed(2);
            const concrete = (area * 0.11).toFixed(2);

            result.innerHTML = `
                <strong>RCC Estimate:</strong><br>
                Steel: ${steel} Tons<br>
                Concrete: ${concrete} Cft
            `;
        });
    }

    // ==========================================
    // 13. WEATHER CHECK
    // ==========================================
    const checkWeatherBtn = document.getElementById('checkWeatherBtn');

    if (checkWeatherBtn) {

        checkWeatherBtn.addEventListener('click', function () {

            const result = document.getElementById('weatherResult');

            result.textContent = 'Fetching your location...';

            if (!navigator.geolocation) {
                result.textContent = 'Geolocation is not supported by your browser.';
                return;
            }

            navigator.geolocation.getCurrentPosition(function (position) {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
                    .then(res => res.json())
                    .then(data => {

                        const weather = data.current_weather;
                        const temp = weather.temperature;

                        let condition = 'Clear';

                        if (weather.weathercode >= 51 && weather.weathercode <= 65) condition = 'Rainy';
                        else if (weather.weathercode >= 71 && weather.weathercode <= 77) condition = 'Snowy';
                        else if (weather.weathercode >= 80 && weather.weathercode <= 99) condition = 'Stormy';

                        const suitable = condition === 'Clear' ? '✅ Suitable' : '❌ Not Suitable';

                        result.innerHTML = `
                            <strong>Weather Status:</strong><br>
                            Temperature: ${temp}°C<br>
                            Condition: ${condition}<br>
                            Construction: ${suitable}
                        `;
                    })
                    .catch(() => {
                        result.textContent = 'Unable to fetch weather data. Please try again.';
                    });

            }, function () {
                result.textContent = 'Unable to get your location. Please enable location services.';
            });
        });
    }

    // ==========================================
    // 14. SMART FURNITURE FIT CHECKER
    // ==========================================
    const checkFurnitureBtn = document.getElementById('checkFurnitureBtn');

    if (checkFurnitureBtn) {

        checkFurnitureBtn.addEventListener('click', function () {

            const length = parseFloat(document.getElementById('smartRoomLength').value);
            const width = parseFloat(document.getElementById('smartRoomWidth').value);
            const furnitureArea = parseFloat(document.getElementById('smartFurnitureType').value);

            if (!length || !width || length <= 0 || width <= 0) {
                alert('Please enter valid room dimensions.');
                return;
            }

            const roomArea = length * width;
            const freeSpace = roomArea - furnitureArea;
            const percentage = (freeSpace / roomArea) * 100;

            let verdict = '';

            if (percentage >= 60) verdict = '✅ Spacious - Great!';
            else if (percentage >= 40) verdict = '⚠️ Comfortable - Good';
            else verdict = '❌ Too Tight - Consider smaller furniture';

            document.getElementById('resSmartRoomArea').textContent = roomArea.toFixed(2) + ' sq.ft';
            document.getElementById('resSmartFreeSpace').textContent = freeSpace.toFixed(2) + ' sq.ft';
            document.getElementById('resSmartVerdict').textContent = verdict;
        });
    }

    // ==========================================
    // 15. CONTRACTOR QUOTE COMPARISON
    // ==========================================
    const compareBtn = document.getElementById('compareBtn');

    if (compareBtn) {

        compareBtn.addEventListener('click', function () {

            const area = parseFloat(document.getElementById('totalArea').value);
            const rateA = parseFloat(document.getElementById('rateA').value);
            const rateB = parseFloat(document.getElementById('rateB').value);
            const result = document.getElementById('compareResult');

            if (!area || !rateA || !rateB || area <= 0 || rateA <= 0 || rateB <= 0) {
                result.textContent = 'Please enter valid values for all fields.';
                return;
            }

            const costA = area * rateA;
            const costB = area * rateB;

            const difference = Math.abs(costA - costB);
            const winner = costA < costB ? 'A' : 'B';
            const savings = Math.abs(costA - costB);

            result.innerHTML = `
                <strong>Quote Comparison:</strong><br>
                Contractor A: ₹ ${costA.toLocaleString()}<br>
                Contractor B: ₹ ${costB.toLocaleString()}<br>
                Difference: ₹ ${difference.toLocaleString()}<br>
                🏆 Contractor ${winner} is cheaper by ₹ ${savings.toLocaleString()}
            `;
        });
    }

});