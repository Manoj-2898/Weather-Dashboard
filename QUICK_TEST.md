# 🚀 Quick Test Guide - Weather Dashboard

## 5-Minute Quick Test

### Step 1: Open App (10 seconds)
```
URL: http://localhost:5174
Look for: Delhi weather, temperature, forecast cards, map
```

### Step 2: Test Anantapur Fix (1 minute)
```
Search: "Anantapur"
Check:
  ✓ Shows "Anantapur, IN"
  ✓ Subtitle shows: "Anantapur, ... Andhra Pradesh, India"
  ✓ NOT Wadgon (bug is fixed!)
  ✓ Weather loads for Anantapur
```

### Step 3: Test International Country Codes (1 minute)
```
Search: "Tokyo"
Check:
  ✓ Shows "Tokyo, JP" (NOT "IN")
  ✓ Subtitle shows Japanese hierarchy
  ✓ Weather loads for Tokyo
  ✓ Country code is correct: JP
```

### Step 4: Test Map Click (1 minute)
```
Action: Scroll to map, click on Japan region
Check:
  ✓ Location updates to Japanese city
  ✓ Country code shows "JP" (NOT "IN")
  ✓ Weather loads for clicked location
  ✓ Map marker moves to click point
```

### Step 5: Test Recent Searches (1 minute)
```
Action: Search 2-3 different cities
Check:
  ✓ Recent searches list shows below map
  ✓ Most recent appears first
  ✓ Click on recent search loads weather
```

**Result**: ✅ PASS (all 5 checks completed)

---

## Full Test Suite (10-15 minutes)

Use the comprehensive test cases in `TEST_CASES.md`:

```bash
# Open browser console and run:
F12 → Console → copy TEST_SUITE.js → paste in console → runAllTests()
```

---

## Key Features Tested

| Feature | How to Test | Expected |
|---------|------------|----------|
| **Anantapur Bug Fix** | Search "Anantapur" | Shows Andhra Pradesh, not Wadgon |
| **Country Code Fix** | Search "Tokyo" or click Japan map | Shows JP, not IN |
| **Place Hierarchy** | Any search | Shows village/district/state/country |
| **Map Interactive** | Click on map | Location + weather updates |
| **Dark Mode** | Click Dark/Light button | UI theme changes |
| **Recent Searches** | Search cities | List saves, persists after refresh |
| **Weather Display** | Any search | Shows current, forecast, chart |

---

## Troubleshooting

### Issue: Blank page
**Fix**: Refresh (F5), check console (F12) for errors

### Issue: "Unknown Location"
**Fix**: Normal if APIs slow, try searching a major city

### Issue: Still showing "IN" for Japan
**Fix**: 
1. Hard refresh (Ctrl+Shift+R)
2. Clear browser cache
3. Check if using latest weatherApi.js

### Issue: Anantapur still shows Wadgon
**Fix**: 
1. Check that geolocation.js is imported in weatherApi.js
2. Verify reverseGeocode function is being called
3. Check browser console for errors

---

## All Test Files Available

| File | Purpose | How to Use |
|------|---------|-----------|
| **TEST_CASES.md** | 24 detailed test cases | Follow checklist, mark pass/fail |
| **TEST_SUITE.js** | Automated API tests | Run in browser console |
| **TEST_EXECUTION_SUMMARY.md** | Complete test report | Reference for all tests |
| **GEOLOCATION.md** | Technical docs | Understand implementation |

---

## Success Criteria

✅ **All tests pass if**:
1. Anantapur shows correct state (Andhra Pradesh)
2. Tokyo shows JP country code
3. Map click in Japan shows JP
4. No console errors
5. Weather displays all data
6. Recent searches persist

---

**Status**: Ready for testing! 🎉
