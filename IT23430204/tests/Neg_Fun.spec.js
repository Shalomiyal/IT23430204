const { test } = require('@playwright/test');

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
    test.setTimeout(120000);
  await page.goto('https://tamil.changathi.com/');
  const textarea = page.locator('#transliterateTextarea');

  const tests = [

  
  {
    input: 'Weekend la friends oda outing pogalam bring 5000',
    expected: 'Weekend ல friends ஓட outing போகலாம் bring 5000 ',
  },
  {
    input: 'Naan romba busy ah iruken indha week la',
    expected: 'நான் ரொம்ப busy அ இருக்கேன் இந்த week ல ',
  },
  {
    input : 'PROJECT KU MELA TIME KUDUKANUM',
    expected : 'PROJECT கு மேல time குடுக்கனும் ',
  },
  {
    input : 'enaku romba boring ah iruku',
    expected : 'எனக்கு ரொம்ப boring அ இருக்கு ',
  },
  {
    input : 'FYI Work life balance mukkiyam',
    expected : 'FYI Work life balance முக்கியம் ',
  },
  {
    input : 'Ellaam wedding ku vanga',
    expected : 'எல்லாம் wedding கு வங்க ', 
  },
  {
    input : 'Ellaam correct work seianu',
   expected : 'எல்லாம் correct work செயானு ',
  },
  {
    input : 'enga bike venu idaku',
    expected : 'எங்கு bike வேணு இடக்கு ',
  },
  {
    input : 'Project seiyaa meet pannanu ',
    expected : 'Project செய்யா meet பண்ணனு ',
},
  {
    input :'unga cooking super ah iruku',
    expected : 'உங்க cooking சூப்பர் அ இருக்கு ',
  },
  
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
      console.log(colors.red(`✅ Pos_Fun_ ${i + 1}: "${input}" | Output: "${output}"`));
    } else {
      console.log(
        colors.green(
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
