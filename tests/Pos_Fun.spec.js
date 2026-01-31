const { test, expect } = require('@playwright/test');
const { time } = require('node:console');

const colors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
};

// Helper: type word by word with space
async function typeWithSpaces(textarea, sentence) {
  const words = sentence.split(' ');
  for (const word of words) {
    await textarea.type(word + ' ', { delay: 300 }); // small delay helps AI process
  }
}

test('Tamil Transliteration - Sequential Tests', async ({ page }) => {
  test.setTimeout(600000);
  await page.goto('https://tamil.changathi.com/');
  const textarea = page.locator('#transliterateTextarea');

  const tests = [
     // ===== SHORT (≤ 30 chars) =====
  { input: 'Neenga enna panna pora ?', expected: 'நீங்க என்ன பண்ண போற ? ' },
  { input: 'Enna pannura ?', expected: 'என்ன பண்ணுற ? ' },
  { input: 'Vanakkam !', expected: 'வணக்கம் ! ' },
  { input: 'Nee sappittaya ?', expected: 'நீ சாப்பிட்டாயா ? ' },
  { input: 'Ingava', expected: 'இங்கவா ' },
  { input: 'Poren', expected: 'போறேன் ' },
  { input: 'Rompa sandhosham', expected: 'ரொம்ப சந்தோஷம் ' },
  { input: 'Nalla iruku', expected: 'நல்ல இருக்கு ' },

  // ===== MEDIUM (31–299 chars) =====
  {
    input: 'Indaiku romba vela iruku',
    expected: 'இண்டைக்கு ரொம்ப வேல இருக்கு ',
  },
  {
    input: 'Naalaiku parichichai iruku athukaga tayar panren',
    expected: 'நாளைக்கு பரிசிச்சை இருக்கு அதுக்காக தயார் பண்றேன் ',
  },
  {
    input: 'Namma ellarum serndhu cinima pakalam',
    expected: 'நம்ம எல்லாரும் சேர்ந்து சினிமா பாக்கலாம்',
  },
  {
    input: 'Peruntu tamathamaga aagudhu adhanala konjam tamathama varuven',
    expected: 'பேருந்து தாமதமாக ஆகுது அதனால கொஞ்சம் தாமதமா வருவேன் ',
  },
  
 {
    input: 'Amma enna samaikuranga nu paakuren',
    expected: 'அம்மா என்ன சமைக்குறாங்க னு பாக்குறேன் ',
  },
 
   {
    input: 'Nan vittukkup poy unnaik kuppituren',
    expected: 'நன் வீட்டுக்குப் போய் உன்னைக் கூப்பிடுறேன் ',
  },

  {
    input:'aval romba kastapaduva',
    expected:'அவள் ரொம்ப கஷ்டப்படுவ ',
  },

  { 
    input : 'Antha ponu unathaa pakuthu daa',
    expected : 'அந்த பொண்ணு உனதா பகுத்து டா '
  },

  {
    input : 'naan unnai vittil irakki vitukiren',
    expected : 'நான் உன்னை வீட்டில் இறக்கி விடுகிறேன் ' 
   },
   {
    input: 'inru camaiyal romba nallaa iruku',
    expected: 'இன்று சமையல் ரொம்ப நல்லா இருக்கு ',
  },
  { 
    input: 'avanukku romba santhosham',
    expected: 'அவனுக்கு ரொம்ப சந்தோசம் ',
  },
  {
    input : 'enku romba pasikethu',
    expected : 'எங்கு ரொம்ப பசிக்கேது ',
  },
  {
    input : 'nalake santhipomnu ninaikuren',
    expected : 'நாளைக்கே சந்திப்போம்னு நினைக்குறேன் ',
  },
  {
    input: 'innum veettukku pokalaiya',
    expected: 'இன்னும் வீட்டுக்கு போகலையா ',
  },
  // ===== LONG (≥ 300 chars) =====
  {
    input:
      'Inda vela panna romba muyarci podanum' +
      ' ellarum Orunkinaittu pannina mattum dhaan vela aagum' +
      ' nera melanmai romba mukkiyam',
    expected:
      'இந்த வேல பண்ண ரொம்ப முயற்சி போடணும் ' +
      'எல்லாரும் ஒருங்கிணைத்து பண்ணின மட்டும் தான் வேல ஆகும் ' +
      'நேர மேலாண்மை ரொம்ப முக்கியம் ',
  },
{
    input:'avan romba kalama kanama poitan'
      + ' avan ipo enna panuraan'
      + ' avan kuda kathachi neeraya kalam irukanum',

      expected:'அவன் ரொம்ப காலமா காணாம போய்ட்டான் '
      + 'அவன் இப்போ என்ன பண்ணுறான் '
      + 'அவன் கூட கராச்சி நிறைய காலம் இருக்கனும் ',
  }
];

  for (let i = 0; i < tests.length; i++) {
    const { input, expected } = tests[i];

    // Clear textarea
    await textarea.fill('');

    // Type word by word with space to trigger Tamil transliteration
    await typeWithSpaces(textarea, input);

    // Wait until AI transliteration produces Tamil text
    await page.waitForFunction(
      (selector, originalText) => {
        const ta = document.querySelector(selector);
        // Wait until it contains at least one Tamil character
        return ta && /[\u0B80-\u0BFF]/.test(ta.value);
      },
      '#transliterateTextarea',
      input
    );

    // Get the output
    const output = await textarea.inputValue();

    if (output.includes(expected)) {
      console.log(colors.green(`✅ Pos_Fun_ ${i + 1}: "${input}" | Output: "${output}"`));
    } else {
      console.log(
        colors.red(
          `❌ Neg_Fun_ ${i + 1}: "${input}" | Output: "${output}" | Expected contains: "${expected}"`
        )
      );
    }

    // Clear textarea for next test
    await textarea.click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');

  }
});
