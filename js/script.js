const toggleBtn = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (toggleBtn && navMenu) {
  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}
document.addEventListener("DOMContentLoaded", function () {
  // பொத்தான்களைத் தேர்வு செய்க
  const filterButtons = document.querySelectorAll(".filter-btn"); // உங்கள் பொத்தான்களின் class
  const projectCards = document.querySelectorAll(".project-card"); // ஒவ்வொரு ப்ராஜெக்ட் கார்டின் class

  // பொத்தான்களுக்கு click event இணைக்கவும்
  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-filter"); // எ.கா: "residential", "all"

      // ஒவ்வொரு கார்டையும் சோதிக்கவும்
      projectCards.forEach(card => {
        if (category === "all") {
          card.style.display = "block";
        } else {
          const cardCategory = card.getAttribute("data-category");
          if (cardCategory === category) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".prev-testimonial");
  const nextBtn = document.querySelector(".next-testimonial");
  let currentIndex = 0;

  // செயலில் உள்ள கார்டை மாற்றும் ஃபங்ஷன்
  function showCard(index) {
    // அனைத்து கார்டுகளிலிருந்தும் active ஐ நீக்கு
    cards.forEach((card, i) => {
      card.classList.remove("active");
      // விருப்பம்: display: none / block மாற்ற வேண்டுமானால்
      card.style.display = "none";
    });
    // புதிய கார்டை active ஆக்கு
    cards[index].classList.add("active");
    cards[index].style.display = "block";
  }

  // ஆரம்பத்தில் active உள்ள கார்டை மட்டும் காட்டு
  cards.forEach((card, i) => {
    if (!card.classList.contains("active")) {
      card.style.display = "none";
    } else {
      card.style.display = "block";
      currentIndex = i;
    }
  });

  // Next பொத்தான்
  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
  });

  // Prev பொத்தான்
  prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showCard(currentIndex);
  });
});
/**
 * Construction Cost and Material Estimator
 * Calculates total project cost and basic civil material quantities 
 * based on area square footage using standard engineering thumb rules.
 */
function calculateConstructionCost() {
    // 1. Fetch input data from HTML UI
    const areaInput = document.getElementById('builtUpArea').value;
    const rateInput = document.getElementById('constructionQuality').value;

    const area = parseFloat(areaInput);
    const ratePerSqFt = parseFloat(rateInput);

    // 2. Validate input measurements
    if (!area || area <= 0) {
        alert("Please enter a valid positive built-up area size!");
        return;
    }

    // 3. Calculate Overall Financial Cost
    const totalCost = area * ratePerSqFt;

    // 4. Structural Material Calculations (Standard Civil Engineering Thumb Rules)
    // Cement: ~0.4 Bags per Sq.Ft of built-up area
    const cementBags = Math.ceil(area * 0.4);
    
    // Steel: ~4 kg per Sq.Ft (Converted to Metric Tons: 1 Ton = 1000 kg)
    const steelTons = parseFloat((area * 4) / 1000).toFixed(2);
    
    // Sand: ~1.8 Cubic Feet per Sq.Ft (Converted to Brass: 1 Brass = 100 CFT)
    const sandBrass = parseFloat((area * 1.8) / 100).toFixed(1);
    
    // Aggregate (Coarse): ~1.35 Cubic Feet per Sq.Ft (Converted to Brass)
    const aggregateBrass = parseFloat((area * 1.35) / 100).toFixed(1);
    
    // Bricks: ~22 Nos per Sq.Ft of built-up area (Includes structural and partition walls)
    const bricksCount = Math.ceil(area * 22);

    // 5. Currency Formatting (Indian Numbering System Format)
    const formatCurrency = (amount) => "₹ " + Math.round(amount).toLocaleString('en-IN');

    // 6. Push calculated metrics into the Estimate Report UI Elements
    document.getElementById('resTotalCost').innerText = formatCurrency(totalCost);
    document.getElementById('resCementQty').innerText = cementBags.toLocaleString('en-IN') + " Bags";
    document.getElementById('resSteelQty').innerText = steelTons + " Tons";
    document.getElementById('resSandQty').innerText = sandBrass + " Brass";
    document.getElementById('resAggregateQty').innerText = aggregateBrass + " Brass";
    document.getElementById('resBricksQty').innerText = bricksCount.toLocaleString('en-IN') + " Nos";
}

document.getElementById('convertBtn').addEventListener('click', function() {
  const val = parseFloat(document.getElementById('unitValue').value);
  const from = document.getElementById('fromUnit').value;
  const to = document.getElementById('toUnit').value;
  const resultDiv = document.getElementById('unitResult');

  if (isNaN(val)) {
    resultDiv.innerHTML = "Please enter a valid number.";
    return;
  }

  // Conversion rates relative to Square Feet (sq.ft)
  const toSqFt = {
    sqft: 1,
    cent: 435.6,
    sqm: 10.7639,
    acre: 43560
  };

  // Logic: Convert input to SqFt first, then to target unit
  const valueInSqFt = val * toSqFt[from];
  const finalValue = valueInSqFt / toSqFt[to];

  resultDiv.innerHTML = `<strong>Result:</strong> ${finalValue.toLocaleString(undefined, {maximumFractionDigits: 4})} ${to.toUpperCase()}`;
});


function calculateLoanDetails() {
    const p = parseFloat(document.getElementById('loanAmount').value);
    const annualRate = parseFloat(document.getElementById('loanInterest').value);
    const years = parseFloat(document.getElementById('loanTenure').value);
    const income = parseFloat(document.getElementById('monthlyIncome').value);

    if (!p || p <= 0 || !annualRate || annualRate <= 0 || !years || years <= 0 || !income || income <= 0) {
        alert("Please enter valid positive values for all fields!");
        return;
    }

    // EMI Calculation Formula: EMI = [P x R x (1+R)^N]/[((1+R)^N)-1]
    const r = (annualRate / 12) / 100; // Monthly interest rate
    const n = years * 12; // Total number of months

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    // Format to Indian Currency Style
    const fmt = (num) => "₹ " + Math.round(num).toLocaleString('en-IN');

    document.getElementById('resLoanEMI').innerText = fmt(emi) + " / month";
    document.getElementById('resTotalInterest').innerText = fmt(totalInterest);

    // Bank Rule: EMI shouldn't exceed 50% of monthly net income
    const eligibilityElement = document.getElementById('resLoanEligibility');
    const safeEMILimit = income * 0.50;

    if (emi <= safeEMILimit) {
        eligibilityElement.innerText = "Approved! Your income naturally supports this loan amount.";
        eligibilityElement.style.backgroundColor = "#d4edda"; // Green
        eligibilityElement.style.color = "#155724";
    } else {
        const maxSuggestedLoan = (safeEMILimit / emi) * p;
        eligibilityElement.innerText = "High Risk! Reduce loan amount to approx " + fmt(maxSuggestedLoan) + " or increase tenure.";
        eligibilityElement.style.backgroundColor = "#fff3cd"; // Orange/Yellow
        eligibilityElement.style.color = "#856404";
    }
}

function calculateVastu() {
  const room = document.getElementById('vastu-room')?.value;
  const direction = document.getElementById('vastu-direction')?.value;
  const output = document.getElementById('vastu-output');

  if (!output) return;

  if (!room || !direction) {
    output.innerHTML = "";
    return;
  }

  let message = "";
  let color = "";

  if (room === "kitchen") {
    if (direction === "SE") {
      message = "✅ Excellent! Southeast (Agneya) is ideal for kitchen.";
      color = "#28a745";
    } else if (direction === "NW") {
      message = "🟡 Neutral! Northwest (Vayu) is a second-best option.";
      color = "#ffc107";
    } else if (direction === "NE") {
      message = "❌ Highly Unfavorable! Northeast is not recommended for kitchen.";
      color = "#dc3545";
    } else {
      message = "❌ Unfavorable! Avoid kitchen in this direction.";
      color = "#dc3545";
    }
  } else if (room === "pooja") {
    if (direction === "NE") {
      message = "✅ Excellent! Northeast (Ishanya) is highly recommended for pooja room.";
      color = "#28a745";
    } else if (direction === "E" || direction === "N") {
      message = "🟡 Good Alternative! East or North brings positive energy for prayer.";
      color = "#ffc107";
    } else if (direction === "W") {
      message = "🟡 Neutral! Acceptable if needed, but face East while praying.";
      color = "#ffc107";
    } else if (direction === "SE" || direction === "NW" || direction === "S" || direction === "SW") {
      message = "❌ Unfavorable! This direction is not ideal for pooja room.";
      color = "#dc3545";
    } else {
      message = "❌ Unfavorable! Invalid pooja room placement.";
      color = "#dc3545";
    }
  } else if (room === "master_bedroom") {
    if (direction === "SW") {
      message = "✅ Excellent! Southwest is ideal for master bedroom.";
      color = "#28a745";
    } else if (direction === "S" || direction === "W") {
      message = "🟡 Good Alternative! South or West can work well.";
      color = "#ffc107";
    } else if (direction === "NW") {
      message = "🟡 Neutral! Okay for guest or children’s bedroom.";
      color = "#ffc107";
    } else if (direction === "N" || direction === "NE" || direction === "E" || direction === "SE") {
      message = "❌ Unfavorable! Not recommended for master bedroom.";
      color = "#dc3545";
    } else {
      message = "❌ Unfavorable! Invalid master bedroom placement.";
      color = "#dc3545";
    }
  } else if (room === "toilet") {
    if (direction === "NW" || direction === "W") {
      message = "✅ Excellent! Northwest or West is suitable for toilet/bathroom.";
      color = "#28a745";
    } else if (direction === "S") {
      message = "🟡 Neutral! South can be acceptable in some layouts.";
      color = "#ffc107";
    } else if (direction === "NE" || direction === "E" || direction === "N" || direction === "SE" || direction === "SW") {
      message = "❌ Unfavorable! This direction is not recommended for toilet/bathroom.";
      color = "#dc3545";
    } else {
      message = "❌ Unfavorable! Invalid toilet placement.";
      color = "#dc3545";
    }
  } else {
    message = "Please select a room type.";
    color = "#0b6aa2";
  }

  output.style.color = color;
  output.innerHTML = message;
}


document.getElementById('calcBtn').addEventListener('click', function() {
  const area = parseFloat(document.getElementById('plasterArea').value);
  const thickInches = parseFloat(document.getElementById('thickness').value);
  const resultDiv = document.getElementById('plasterResult');

  if (!area || !thickInches || area <= 0 || thickInches <= 0) {
    resultDiv.innerHTML = "Please enter valid positive numbers.";
    return;
  }

  // 1. Calculate Wet Volume (cu.ft)
  const wetVolume = area * (thickInches / 12);
  
  // 2. Add 33% for Dry Volume (standard construction practice)
  const dryVolume = wetVolume * 1.33;

  // 3. Ratio 1:4 (1 part cement, 4 parts sand = 5 total parts)
  const cementRatio = 1 / 5;
  const sandRatio = 4 / 5;

  const cementCuFt = dryVolume * cementRatio;
  const sandCuFt = dryVolume * sandRatio;

  // 4. Convert Cement to Bags (1 bag = 1.25 cu.ft)
  const cementBags = cementCuFt / 1.25;

  resultDiv.innerHTML = `
    <strong>Required Materials:</strong><br>
    • Cement: <strong>${cementBags.toFixed(2)} Bags</strong><br>
    • Sand: <strong>${sandCuFt.toFixed(2)} Cu.ft</strong>
  `;
});
document.getElementById('calcTileBtn').addEventListener('click', function() {
  const floorArea = parseFloat(document.getElementById('floorArea').value);
  const sizeSide = parseFloat(document.getElementById('tileSize').value);
  const resultDiv = document.getElementById('tileResult');

  if (!floorArea || floorArea <= 0) {
    resultDiv.innerHTML = "Please enter a valid floor area.";
    return;
  }

  // 1. Calculate area of one tile in sq.ft
  // (sizeSide inches / 12) converts inches to feet
  const tileAreaSqFt = (sizeSide / 12) * (sizeSide / 12);

  // 2. Calculate base count and add 10% for wastage
  const baseCount = floorArea / tileAreaSqFt;
  const totalWithWastage = Math.ceil(baseCount * 1.10);

  resultDiv.innerHTML = `
    <strong>Estimate:</strong><br>
    • Tiles needed: <strong>${totalWithWastage} tiles</strong><br>
    <small style="color: #666;">(Includes 10% for cutting & wastage)</small>
  `;
});
document.getElementById('calcPaintBtn').addEventListener('click', () => {
  const area = parseFloat(document.getElementById('paintArea').value);
  const coats = parseInt(document.getElementById('coatCount').value);
  const resultDiv = document.getElementById('paintResult');

  // Standard coverage: 1 liter covers ~110 sq.ft per coat
  const coveragePerLiter = 110; 

  if (!area || area <= 0) {
    resultDiv.innerHTML = "Please enter a valid area.";
    return;
  }

  // Calculation logic
  const totalCoverageNeeded = area * coats;
  const litersRequired = totalCoverageNeeded / coveragePerLiter;
  
  // Adding 10% buffer for wastage/spillage
  const finalEstimate = litersRequired * 1.10;

  resultDiv.innerHTML = `
    <strong>Estimate for ${coats} coat(s):</strong><br>
    • Required Paint: <strong>${finalEstimate.toFixed(1)} Liters</strong><br>
    <small style="color: #666;">(Includes 10% buffer for wastage)</small>
  `;
});

function saveChecklist() {
  const checkboxes = document.querySelectorAll('.checkItem');
  const statusArr = Array.from(checkboxes).map(cb => cb.checked ? 1 : 0);
  localStorage.setItem('constructionChecklistGrid', JSON.stringify(statusArr));
  showResult('checklistMsg', "Checklist saved! Progress will persist after reload.");
}

function loadChecklist() {
  const saved = localStorage.getItem('constructionChecklistGrid');
  if (!saved) return;

  const statusArr = JSON.parse(saved);
  const checkboxes = document.querySelectorAll('.checkItem');

  statusArr.forEach((val, idx) => {
    if (checkboxes[idx]) checkboxes[idx].checked = val === 1;
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => {});
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const generateBtn = document.getElementById('generateBtn');
  const copyBtn = document.getElementById('copyBtn');
  const styleSelect = document.getElementById('renderStyle');
  const resultContainer = document.getElementById('resultContainer');
  const promptDisplay = document.getElementById('promptDisplay');

  // Handle generation
  generateBtn.addEventListener('click', () => {
    const base = styleSelect.value;
    const finalPrompt = `Photorealistic 8k architectural render, ${base}, cinematic lighting, highly detailed, Unreal Engine 5 style.`;
    
    promptDisplay.textContent = finalPrompt;
    resultContainer.style.display = 'block';
  });

  // Handle clipboard copy
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(promptDisplay.textContent).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy Prompt', 2000);
    });
  });
});

/**
 * Water Tank Capacity Calculator
 * Calculates daily water requirements and recommends tank dimensions 
 * based on family size and standard IS Code 1172 metrics.
 */
function calculateTankSize() {
    // 1. Get input values from HTML
    const membersInput = document.getElementById('familyMembers').value;
    const backupDaysInput = document.getElementById('tankType').value;

    const members = parseInt(membersInput);
    const backupDays = parseInt(backupDaysInput);

    // 2. Validate input fields
    if (!members || members <= 0) {
        alert("Please enter a valid number of family members!");
        return;
    }

    // 3. Calculate water demand (Standard: 135 Liters per person per day as per IS Code 1172)
    const dailyWater = members * 135;
    const totalCapacity = dailyWater * backupDays;

    // 4. Convert Liters to Cubic Feet (1 Cubic Foot = 28.317 Liters)
    const totalCft = totalCapacity / 28.317;

    // 5. Determine ideal structural dimensions (Using a standard fixed depth of 5 feet)
    const depth = 5; 
    const remainingArea = totalCft / depth;
    
    // Calculate balanced width and length layout
    const width = Math.sqrt(remainingArea);
    const length = remainingArea / width;

    // Round up measurements to the nearest whole foot for easy brickwork construction
    const cleanLength = Math.ceil(length);
    const cleanWidth = Math.ceil(width);

    // 6. Update the text display elements in the HTML UI
    document.getElementById('resDailyWater').innerText = dailyWater + " Liters / day";
    document.getElementById('resTotalCapacity').innerText = totalCapacity + " Liters";
    document.getElementById('resTankDimensions').innerText = cleanLength + "ft (L) x " + cleanWidth + "ft (W) x " + depth + "ft (Depth)";
}

function estimateSolarRequirements() {
    const bill = parseFloat(document.getElementById('ebBill').value);

    if (!bill || bill <= 0) {
        alert("Please enter a valid monthly EB bill amount!");
        return;
    }

    // Standard Solar Metrics Rules:
    // Avg domestic tariff unit cost is roughly ₹7. 1kW plant generates ~120 units/month saving ~₹840/month.
    const plantSizeKw = Math.ceil(bill / 840); 
    
    // 1 kW of solar panels requires roughly 100 sq.ft of clean shadow-free roof area
    const requiredSpaceSqFt = plantSizeKw * 100; 

    // Yearly savings calculations (approx 85-90% reduction on bill)
    const annualSavings = bill * 12 * 0.85;

    // Format currency
    const fmt = (num) => "₹ " + Math.round(num).toLocaleString('en-IN');

    // Update UI elements
    document.getElementById('resSolarSize').innerText = plantSizeKw + " kW System";
    document.getElementById('resSolarSpace').innerText = requiredSpaceSqFt + " sq.ft";
    document.getElementById('resSolarSavings').innerText = fmt(annualSavings) + " / year";
}

document.getElementById('calcRccBtn').addEventListener('click', () => {
  const area = parseFloat(document.getElementById('rccArea').value);
  const type = document.getElementById('buildingType').value;
  const resultDiv = document.getElementById('steelResult');

  if (!area || area <= 0) {
    resultDiv.innerHTML = "Please enter a valid area.";
    return;
  }

  // Thumb Rule Constants
  // Residential: 0.35 bags/sqft, 3.5 kg/sqft steel
  // Commercial: 0.45 bags/sqft, 4.5 kg/sqft steel
  const rates = {
    residential: { cement: 0.35, steel: 3.5 },
    commercial: { cement: 0.45, steel: 4.5 }
  };

  const cementBags = area * rates[type].cement;
  const steelKg = area * rates[type].steel;

  resultDiv.innerHTML = `
    <strong>Estimates for ${type}:</strong><br>
    • Cement: <strong>${Math.ceil(cementBags)} Bags</strong><br>
    • Steel (TMT): <strong>${steelKg.toFixed(0)} kg</strong><br>
    <small style="color: #666;">*Estimates are based on standard thumb rules.</small>
  `;
});

/**
 * Updates the UI with the final result
 * @param {string} elementId 
 * @param {string} message 
 */
function showResult(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = message;
}

/**
 * Fetches and processes weather data for Coimbatore construction site
 */
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('checkWeatherBtn');
    btn.addEventListener('click', getLocationAndWeather);
});

// 1. Get User Location
function getLocationAndWeather() {
    const resultDiv = document.getElementById('weatherResult');
    
    if (!navigator.geolocation) {
        resultDiv.innerHTML = "Geolocation is not supported by your browser.";
        return;
    }

    resultDiv.innerHTML = "<em>Detecting your location...</em>";

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
        },
        (error) => {
            resultDiv.innerHTML = "<em>Location access denied. Please allow location permissions.</em>";
        }
    );
}

// 2. Fetch Weather based on Dynamic Coordinates
async function fetchWeather(lat, lon) {
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = "<em>Analyzing climate data for your coordinates...</em>";

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,rain,showers&timezone=auto`);
        
        if (!response.ok) throw new Error("Connection failed");

        const data = await response.json();
        const temp = data.current.temperature_2m;
        const rain = data.current.precipitation ?? 0;

        // Logic Evaluation
        const isRaining = rain > 0;
        const isTooHot = temp > 35;
        const isIdeal = temp >= 28 && temp <= 35;

        let status, advice, statusClass;

        if (isRaining) {
            status = "Not suitable – Rain expected.";
            advice = "Avoid concrete pouring & plastering.";
            statusClass = "alert-danger";
        } else if (isTooHot) {
            status = "Too hot – High heat risk.";
            advice = "Schedule work for early morning or late evening.";
            statusClass = "alert-warning";
        } else if (isIdeal) {
            status = "Suitable – Good weather.";
            advice = "Ideal conditions for all construction activities.";
            statusClass = "alert-success";
        } else {
            status = "Acceptable conditions.";
            advice = "Standard precautions apply.";
            statusClass = "alert-info";
        }

        showResult('weatherResult', `
            <div class="${statusClass}">
                <strong>${status}</strong><br>
                <span>Temp: ${temp}°C | Rain: ${rain} mm</span><br>
                <p>${advice}</p>
            </div>
        `);

    } catch (e) {
        showResult('weatherResult', '<div class="alert-error">Could not fetch live weather. Check internet connection.</div>');
    }
}

function showResult(elementId, content) {
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = content;
}

function showResult(elementId, content) {
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = content;
}

function showResult(elementId, content) {
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = content;
}

function checkSmartFurnitureFit() {
    // 1. Get input values from HTML
    const lengthInput = document.getElementById('smartRoomLength').value;
    const widthInput = document.getElementById('smartRoomWidth').value;
    const furnitureArea = parseFloat(document.getElementById('smartFurnitureType').value);

    const length = parseFloat(lengthInput);
    const width = parseFloat(widthInput);

    // 2. Validate input fields
    if (!length || length <= 0 || !width || width <= 0) {
        alert("Please enter valid room length and width!");
        return;
    }

    // 3. Calculate spatial areas
    const totalArea = length * width;
    const freeSpace = totalArea - furnitureArea;

    // 4. Update the text display elements
    document.getElementById('resSmartRoomArea').innerText = totalArea + " sq.ft";
    document.getElementById('resSmartFreeSpace').innerText = freeSpace + " sq.ft";

    // 5. Link the verdict element and apply status logic
    const verdictElement = document.getElementById('resSmartVerdict');

    if (freeSpace <= 0) {
        verdictElement.innerText = "No Space! (Furniture is bigger than room)";
        verdictElement.style.backgroundColor = "#f8d7da"; // Dark Red
        verdictElement.style.color = "#721c24";
    } 
    else if (freeSpace < (totalArea * 0.50)) {
        verdictElement.innerText = "Tight Fit! (Room will look very crowded)";
        verdictElement.style.backgroundColor = "#fff3cd"; // Yellow/Orange
        verdictElement.style.color = "#856404";
    } 
    else {
        verdictElement.innerText = "Comfortable Fit! (Plenty of walking space)";
        verdictElement.style.backgroundColor = "#d4edda"; // Green
        verdictElement.style.color = "#155724";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('compareBtn').addEventListener('click', compareContractors);
});

function compareContractors() {
    const area = parseFloat(document.getElementById('totalArea').value);
    const rateA = parseFloat(document.getElementById('rateA').value);
    const rateB = parseFloat(document.getElementById('rateB').value);
    const resultDiv = document.getElementById('compareResult');

    if (!area || !rateA || !rateB) {
        resultDiv.innerHTML = '<p class="error">Please fill in all fields.</p>';
        return;
    }

    const totalA = area * rateA;
    const totalB = area * rateB;
    const difference = Math.abs(totalA - totalB);
    const cheaper = totalA < totalB ? "Contractor A" : "Contractor B";

    resultDiv.innerHTML = `
        <div class="comparison-summary">
            <h4>Results:</h4>
            <p>Total Cost A: <strong>₹${totalA.toLocaleString()}</strong></p>
            <p>Total Cost B: <strong>₹${totalB.toLocaleString()}</strong></p>
            <hr>
            <p><strong>${cheaper}</strong> is cheaper by <strong>₹${difference.toLocaleString()}</strong>.</p>
        </div>
    `;
}
function showSubscribeModal() {
  const msg = `PREMIUM SUBSCRIPTION (Demo simulation)

Benefits:
- Unlimited usage of all tools
- Full PDF reports with detailed breakdown
- Priority support
- AI prompt library

Plan: ₹199 / month`;
  alert(msg);
  showResult('subInfo', "Upgrade requested! In production, you'd redirect to payment.");
}

function loadEstimateData() {
  const map = {
    'pdf-date': localStorage.getItem('pdf_date') || '',
    'pdf-sqft': localStorage.getItem('pdf_sqft') || '',
    'pdf-cost': localStorage.getItem('pdf_cost') || '',
    'pdf-cement': localStorage.getItem('pdf_cement') || '',
    'pdf-steel': localStorage.getItem('pdf_steel') || '',
    'pdf-sand': localStorage.getItem('pdf_sand') || '',
    'pdf-aggregate': localStorage.getItem('pdf_aggregate') || '',
    'pdf-bricks': localStorage.getItem('pdf_bricks') || '',
    'pdf-labor': localStorage.getItem('pdf_labor') || ''
  };

  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerText = map[id];
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadChecklist();
  loadEstimateData();
});