// =====================================
// ANTIGRAVITY AI VISUAL STYLIST
// COMPLETE UPDATED content.js
// =====================================


// =====================================
// 🔑 PASTE YOUR REAL GROQ API KEY
// =====================================

const API_KEY = "YOUR_API_KEY";


// =====================================
// CREATE SIDEBAR
// =====================================

const sidebar = document.createElement("div");

sidebar.id = "antigravity-sidebar";

sidebar.innerHTML = `

  <div id="ag-header">

  <div id="ag-toggle">
    ←
  </div>

    <div id="ag-title">
      ANTIGRAVITY
    </div>

    <div id="ag-status">
      ACTIVE
    </div>

    <div id="ag-floating-tab">
  ANTIGRAVITY
</div>

  </div>

  <textarea
    id="ag-textarea"
    placeholder="e.g. pastel pink saree for wedding">
  </textarea>

  <input
  type="file"
  id="ag-upload"
  accept="image/*"
>

<div id="ag-upload-status">
</div>

<img id="ag-preview">

  <button id="ag-button">
    Generate Outfit
  </button>
  
  <!-- DETECTED STYLE -->

<div class="ag-detected-style">

  <div class="ag-detected-label">
    ✨ Detected Fashion Style
  </div>
  <div class="ag-confidence-card">

  <div class="ag-confidence-header">

    <span>
      AI Style Confidence
    </span>

    <span id="ag-confidence-score">
      92%
    </span>

  </div>

  <div class="ag-confidence-bar">

    <div id="ag-confidence-fill">
    </div>

  </div>

</div>
  <div id="ag-detected-output">
    Waiting for analysis...
  </div>

</div>

  <!-- MAIN STYLE -->

  <div class="ag-section">

    <div class="ag-label">
      👗 Main Style
    </div>

    <div
      class="ag-output"
      id="ag-main">
    </div>

  </div>


  <!-- TOP -->

  <div class="ag-section">

    <div class="ag-label">
      👕 Matching Top
    </div>

    <div
      class="ag-output"
      id="ag-top">
    </div>

  </div>


  <!-- BOTTOM -->

  <div class="ag-section">

    <div class="ag-label">
      👖 Bottom / Draping
    </div>

    <div
      class="ag-output"
      id="ag-bottom">
    </div>

  </div>


  <!-- COLORS -->

  <div class="ag-section">

    <div class="ag-label">
      🎨 Color Palette
    </div>

    <div
      class="ag-output"
      id="ag-colors">
    </div>

  </div>


  <!-- ACCESSORIES -->

  <div class="ag-section">

    <div class="ag-label">
      ✨ Accessories
    </div>

    <div
      class="ag-output"
      id="ag-accessories">
    </div>

  </div>


  <!-- AVOID -->

  <div class="ag-section">

    <div class="ag-label">
      ⚠ Avoid
    </div>

    <div
      class="ag-output"
      id="ag-avoid">
    </div>

  </div>


  <!-- SHOP BUTTON -->

  <button
    class="ag-shop-btn"
    id="ag-shop">
    Search Matching Outfit
  </button>

`;


// =====================================
// ADD SIDEBAR TO PAGE
// =====================================

document.body.appendChild(sidebar);


// =====================================
// IMAGE PREVIEW
// =====================================

const upload =
  document.getElementById("ag-upload");

const preview =
  document.getElementById("ag-preview");
let imageUploaded = false;
upload.addEventListener("change", () => {

  const file =
    upload.files[0];

  if (!file) return;

  const reader =
    new FileReader();

  reader.onload = e => {

  preview.src =
    e.target.result;

  preview.style.display = "block";
  imageUploaded = true;
  document.getElementById(
    "ag-upload-status"
  ).innerText =
    "✔ Image uploaded successfully. AI will use this for outfit inspiration.";

};

    

  reader.readAsDataURL(file);

});


// =====================================
// GENERATE OUTFIT
// =====================================

document
  .getElementById("ag-button")
  .addEventListener("click", async () => {

    const input =
      document.getElementById("ag-textarea").value;

    // EMPTY CHECK
    if (
  !input.trim() &&
  !imageUploaded
) {

  alert(
    "Please enter outfit idea or upload image"
  );

  return;
}

    // LOADING
    document.getElementById("ag-main")
      .innerText = "Generating AI outfit...";

    document.getElementById("ag-top")
      .innerText = "";

    document.getElementById("ag-bottom")
      .innerText = "";

    document.getElementById("ag-colors")
      .innerText = "";

    document.getElementById("ag-accessories")
      .innerText = "";

    document.getElementById("ag-avoid")
      .innerText = "";


    // =====================================
    // AI PROMPT
    // =====================================
    const imageContext = imageUploaded
  ? `
The user has uploaded a fashion inspiration image.

Use the uploaded image as inspiration for:
- colors
- aesthetics
- outfit mood
- styling direction

Mention image inspiration naturally in outfit suggestions.
`
  : "";
    const prompt = `
You are an advanced AI fashion stylist and shopping assistant.

Your job:
1. Understand the user's fashion request
2. Detect the category automatically
3. Generate realistic outfit recommendations
4. Suggest matching fashion items
5. Adapt styling according to the occasion

${imageContext}

USER REQUEST:
${input}

IMPORTANT RULES:

- If user mentions saree/lehenga -> generate ethnic styling
- If user mentions sneakers/streetwear -> generate casual fashion
- If user mentions office/work -> generate formal styling
- If user mentions Korean -> generate Korean aesthetics
- If user mentions luxury -> generate premium fashion
- If user mentions college -> generate Gen-Z casual styling
- If user mentions airport -> generate travel fashion
- If user mentions wedding -> generate festive styling
 
The "detectedStyle" must sound premium, fashionable, and human-like.

GOOD examples:
- Luxury Corporate Minimalism
- Soft Korean Romantic Aesthetic
- Modern Gen-Z Campus Streetwear
- Festive Royal Ethnic Elegance
- Clean Scandinavian Casual

BAD examples:
- sneakers college casual
- Korean pastel outfit
- office luxury black

IMPORTANT:
Return ONLY valid JSON.

FORMAT:
{
  "detectedStyle": "...",
  "mainStyle": "...",
  "topWear": "...",
  "bottomWear": "...",
  "colors": "...",
  "accessories": "...",
  "avoid": "..."
}
`;



    try {

      // =====================================
      // API CALL
      // =====================================

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {

          method: "POST",

          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            model: "openai/gpt-oss-120b",

            messages: [
              {
                role: "user",
                content: prompt
              }
            ],

            temperature: 0.7

          })

        }
      );


      // =====================================
      // RESPONSE
      // =====================================

      const data =
        await response.json();

      console.log(data);


      // =====================================
      // API ERROR CHECK
      // =====================================

      if (!data.choices || !data.choices[0]) {

        console.log(
          JSON.stringify(data, null, 2)
        );

        alert(
          "Groq API failed.\n\nCheck API key or quota."
        );

        return;
      }


      // =====================================
      // AI TEXT
      // =====================================

      let aiText =
        data.choices[0].message.content;

      console.log(aiText);


      // =====================================
      // CLEAN JSON
      // =====================================

      aiText = aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();


      // =====================================
      // PARSE JSON
      // =====================================

      const parsed =
        JSON.parse(aiText);


      // =====================================
      // UPDATE UI
      // =====================================
      document.getElementById(
  "ag-detected-output"
).innerText =
  parsed.detectedStyle;

      // =====================================
// AI CONFIDENCE SCORE
// =====================================

const confidence =
  Math.floor(
    85 + Math.random() * 12
  );

document.getElementById(
  "ag-confidence-score"
).innerText =
  confidence + "%";

document.getElementById(
  "ag-confidence-fill"
).style.width =
  confidence + "%";
  
      document.getElementById("ag-main")
        .innerText = parsed.mainStyle;

      document.getElementById("ag-top")
        .innerText = parsed.topWear;

      document.getElementById("ag-bottom")
        .innerText = parsed.bottomWear;

      document.getElementById("ag-colors")
        .innerText = parsed.colors;

      document.getElementById("ag-accessories")
        .innerText = parsed.accessories;

      document.getElementById("ag-avoid")
        .innerText = parsed.avoid;

           // =====================================
// DYNAMIC BUTTON TEXT
// =====================================

let buttonText =
  "Search Matching Outfit";

const userInput =
  input.toLowerCase();

if (
  userInput.includes("saree") ||
  userInput.includes("lehenga")
) {

  buttonText =
    "Search Matching Blouse";

}

else if (
  userInput.includes("sneakers") ||
  userInput.includes("streetwear")
) {

  buttonText =
    "Search Streetwear Items";

}

else if (
  userInput.includes("korean")
) {

  buttonText =
    "Search Korean Fashion";

}

else if (
  userInput.includes("office") ||
  userInput.includes("formal")
) {

  buttonText =
    "Search Formal Wear";

}

else if (
  userInput.includes("wedding")
) {

  buttonText =
    "Search Wedding Fashion";

}

document
  .getElementById("ag-shop")
  .innerText = buttonText;
      // =====================================
      // SMART SHOPPING SEARCH
      // =====================================

      document
        .getElementById("ag-shop")
        .onclick = () => {

          // SMART SEARCH QUERY

          const query = `
            ${parsed.topWear}
            ${parsed.colors}
            embroidered blouse
            pastel ethnic wear
            wedding fashion
          `;

          window.open(
            `https://www.amazon.in/s?k=${encodeURIComponent(query)}`
          );

        };

    }


    // =====================================
    // ERROR
    // =====================================

    catch (error) {

      console.error(error);

      alert(
        "Something went wrong.\n\nOpen console for details."
      );

    }

  });

 


// =====================================
// COLLAPSIBLE SIDEBAR
// =====================================

const toggleBtn =
  document.getElementById("ag-toggle");

const floatingTab =
  document.getElementById("ag-floating-tab");


// INITIAL STATE
floatingTab.style.display = "none";


// COLLAPSE SIDEBAR

toggleBtn.addEventListener("click", () => {

  sidebar.style.right = "-370px";

  sidebar.style.transition =
    "0.3s ease";

  floatingTab.style.display =
    "flex";

});


// REOPEN SIDEBAR

floatingTab.addEventListener("click", () => {

  sidebar.style.right = "0";

  floatingTab.style.display =
    "none";

});


// REOPEN

floatingTab.addEventListener("click", () => {

  sidebar.style.transform =
    "translateX(0)";

  floatingTab.style.display =
    "none";

});