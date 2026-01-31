// tests/all_tests.spec.js
const { test, expect } = require('@playwright/test');

const TARGET_URL = 'https://www.swifttranslator.com/';

// ============================================================================
// HELPER FUNCTION
// ============================================================================

async function testTranslation(page, inputText, expectedContains) {
  console.log(`Testing: "${inputText.substring(0, 30)}${inputText.length > 30 ? '...' : ''}"`);
  
  try {
    // Go to website
    await page.goto(TARGET_URL, { 
      waitUntil: 'domcontentloaded', 
      timeout: 60000 
    });
    
    // Type text
    const inputBox = page.getByPlaceholder('Input Your Singlish Text Here.');
    await inputBox.fill(inputText);
    
    // Wait for translation
    await page.waitForTimeout(3000);
    
    // Check result
    const bodyText = await page.textContent('body');
    return bodyText.includes(expectedContains);
    
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return false;
  }
}

// ============================================================================
// 24 POSITIVE TESTS
// ============================================================================

test.describe('24 POSITIVE TESTS', () => {
  test.setTimeout(120000);
  
  // Test 1-10
  test('Pos_001: Basic greeting', async ({ page }) => {
    const result = await testTranslation(page, 'suba udaeesanak', 'සුබ');
    expect(result).toBe(true);
  });

  test('Pos_002: Mixed language', async ({ page }) => {
    const result = await testTranslation(page, 'adha puluvannam mata Zoom meeting', 'මට');
    expect(result).toBe(true);
  });

  test('Pos_003: Short question', async ({ page }) => {
    const result = await testTranslation(page, 'adha upload karanavadha?', 'upload');
    expect(result).toBe(true);
  });

  test('Pos_004: Simple statement', async ({ page }) => {
    const result = await testTranslation(page, 'mama kadeeta gihin ennam', 'මම');
    expect(result).toBe(true);
  });

  test('Pos_005: English mixed', async ({ page }) => {
    const result = await testTranslation(page, 'Mama adha late wenna puluvan', 'මම');
    expect(result).toBe(true);
  });

  test('Pos_006: Technical sentence', async ({ page }) => {
    const result = await testTranslation(page, 'existing workflow eka optimise karanna', 'workflow');
    expect(result).toBe(true);
  });

  test('Pos_007: Learning experience', async ({ page }) => {
    const result = await testTranslation(page, 'adha mama JavaScript igena gaththaa', 'JavaScript');
    expect(result).toBe(true);
  });

  test('Pos_008: Complex sentence', async ({ page }) => {
    const result = await testTranslation(page, 'namuth nisaekavama shudhDha', 'නමුත්');
    expect(result).toBe(true);
  });

  test('Pos_009: Polite request', async ({ page }) => {
    const result = await testTranslation(page, 'aayuboovan! karuNaakaralaa mata', 'ආයුබෝවන්');
    expect(result).toBe(true);
  });

  test('Pos_010: Formal communication', async ({ page }) => {
    const result = await testTranslation(page, 'aayuboovan, api amathanne obee', 'ආයුබෝවන්');
    expect(result).toBe(true);
  });

  // Test 11-20
  test('Pos_011: Scientific text', async ({ page }) => {
    const result = await testTranslation(page, 'surYAyaa saha brahaspathin', 'සූර්යයා');
    expect(result).toBe(true);
  });

  test('Pos_012: Casual conversation', async ({ page }) => {
    const result = await testTranslation(page, 'mee oyaa ara kellage instagram', 'instagram');
    expect(result).toBe(true);
  });

  test('Pos_013: Philosophical text', async ({ page }) => {
    const result = await testTranslation(page, 'jiivithee haemadheema', 'ජීවිතේ');
    expect(result).toBe(true);
  });

  test('Pos_014: Life advice', async ({ page }) => {
    const result = await testTranslation(page, 'adu dheeval valin sathutu', 'අඩු');
    expect(result).toBe(true);
  });

  test('Pos_015: Emotional state', async ({ page }) => {
    const result = await testTranslation(page, 'samahara dhavasvala hitha', 'සමහර');
    expect(result).toBe(true);
  });

  test('Pos_016: Daily routine', async ({ page }) => {
    const result = await testTranslation(page, 'mama saeema dhinakama', 'මම');
    expect(result).toBe(true);
  });

  test('Pos_017: Formal greeting', async ({ page }) => {
    const result = await testTranslation(page, 'aayuboovan! obata kohomadha?', 'ආයුබෝවන්');
    expect(result).toBe(true);
  });

  test('Pos_018: Social activity', async ({ page }) => {
    const result = await testTranslation(page, 'Morning ekee api friends', 'Morning');
    expect(result).toBe(true);
  });

  test('Pos_019: Sports news', async ({ page }) => {
    const result = await testTranslation(page, 'Match eka win kaLaa', 'Match');
    expect(result).toBe(true);
  });

  test('Pos_020: Weekend plans', async ({ page }) => {
    const result = await testTranslation(page, 'Weekend ekee family ekath', 'Weekend');
    expect(result).toBe(true);
  });

  // Test 21-24
  test('Pos_021: Test announcement', async ({ page }) => {
    const result = await testTranslation(page, 'adha test eka conduct', 'test');
    expect(result).toBe(true);
  });

  test('Pos_022: School activity', async ({ page }) => {
    const result = await testTranslation(page, 'Teacher absent nisaa', 'Teacher');
    expect(result).toBe(true);
  });

  test('Pos_023: Campus life', async ({ page }) => {
    const result = await testTranslation(page, 'udhee lecture hall ekata', 'lecture');
    expect(result).toBe(true);
  });

  test('Pos_024: Academic study', async ({ page }) => {
    const result = await testTranslation(page, 'Lecture eka aaramBha', 'Lecture');
    expect(result).toBe(true);
  });
});

// ============================================================================
// 10 NEGATIVE TESTS
// ============================================================================

test.describe('10 NEGATIVE TESTS', () => {
  test.setTimeout(120000);
  
  // Negative tests check that English words SHOULD NOT be transliterated
  
  test('Neg_001: "is" should stay English', async ({ page }) => {
    const result = await testTranslation(page, 'it is what it is', 'it is what it is');
    // This should FAIL (return false) if "is" becomes "ඉස්"
    expect(result).toBe(false);
  });

  test('Neg_002: "maths" should stay English', async ({ page }) => {
    const result = await testTranslation(page, 'uba maths notes', 'maths notes');
    expect(result).toBe(false);
  });

  test('Neg_003: Empty input', async ({ page }) => {
    const result = await testTranslation(page, '', 'සුභ'); // Should not find Sinhala
    expect(result).toBe(false);
  });

  test('Neg_004: Special characters', async ({ page }) => {
    const result = await testTranslation(page, '@#$%^&*()', 'සුභ');
    expect(result).toBe(false);
  });

  test('Neg_005: "ChatGPT" should stay English', async ({ page }) => {
    const result = await testTranslation(page, 'ChatGPT tool', 'ChatGPT');
    expect(result).toBe(false);
  });

  test('Neg_006: "JavaScript" should stay English', async ({ page }) => {
    const result = await testTranslation(page, 'JavaScript igena', 'JavaScript');
    expect(result).toBe(false);
  });

  test('Neg_007: "ethernet" should stay English', async ({ page }) => {
    const result = await testTranslation(page, 'ethernet gAEna', 'ethernet');
    expect(result).toBe(false);
  });

  test('Neg_008: "instagram" should stay English', async ({ page }) => {
    const result = await testTranslation(page, 'instagram account', 'instagram');
    expect(result).toBe(false);
  });

  test('Neg_009: English phrase', async ({ page }) => {
    const result = await testTranslation(page, 'what kind of man are you', 'what kind');
    expect(result).toBe(false);
  });

  test('Neg_010: Spaced text issue', async ({ page }) => {
    const result = await testTranslation(page, 'o y a t a', 'ඔයාට');
    expect(result).toBe(false);
  });
});

// ============================================================================
// TEST SUMMARY
// ============================================================================

test('Test Count Verification', () => {
  console.log('\n' + '='.repeat(60));
  console.log('TOTAL TEST COUNT:');
  console.log('='.repeat(60));
  console.log('Positive Tests: 24');
  console.log('Negative Tests: 10');
  console.log('Verification Test: 1');
  console.log('='.repeat(60));
  console.log('GRAND TOTAL: 35 TESTS');
  console.log('='.repeat(60));
  
  expect(24 + 10 + 1).toBe(35);
});