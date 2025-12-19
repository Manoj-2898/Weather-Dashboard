# Weather Dashboard - Manual Test Cases

## Test Environment
- **URL**: http://localhost:5174
- **Browser Console**: Press F12 to open and run automated tests
- **Test Date**: December 19, 2025

---

## Test Case 1: App Initialization ✓

**Objective**: Verify app loads without errors and displays default weather (Delhi)

**Steps**:
1. Open http://localhost:5174 in browser
2. Wait for page to load (should show weather card)
3. Open DevTools (F12) → Console tab
4. Check for any red error messages

**Expected Result**:
- ✅ Page loads completely
- ✅ Shows "Delhi, IN" with temperature
- ✅ No JavaScript errors in console
- ✅ Weather data (temp, humidity, wind, pressure) displays
- ✅ 7-day forecast cards visible below
- ✅ Hourly temperature chart visible

**Pass/Fail**: _______________

---

## Test Case 2: Search Indian Cities (Admin Hierarchy)

**Objective**: Verify search works and displays correct place hierarchy

### Test 2a: Search Delhi
**Steps**:
1. Type "Delhi" in search box
2. Click search or press Enter
3. Observe location display

**Expected Result**:
- ✅ Shows "Delhi, IN"
- ✅ Subtitle shows: "Delhi, Delhi, India" or similar hierarchy
- ✅ Weather updates for Delhi
- ✅ Map marker updates to Delhi location

**Pass/Fail**: _______________

### Test 2b: Search Anantapur
**Steps**:
1. Type "Anantapur" in search box
2. Click search
3. Observe location and hierarchy

**Expected Result**:
- ✅ Shows "Anantapur, IN"
- ✅ Subtitle shows: "Anantapur, Anantapur, Andhra Pradesh, India" (NOT Wadgon)
- ✅ Weather data displays for Anantapur
- ✅ Correct location on map

**Pass/Fail**: _______________

### Test 2c: Search Mumbai
**Steps**:
1. Type "Mumbai" in search box
2. Click search

**Expected Result**:
- ✅ Shows "Mumbai, IN"
- ✅ Subtitle shows Mumbai hierarchy with Maharashtra state
- ✅ Weather updates correctly

**Pass/Fail**: _______________

---

## Test Case 3: Search International Cities (Country Codes)

**Objective**: Verify international searches show correct country codes

### Test 3a: Search Tokyo
**Steps**:
1. Clear search box
2. Type "Tokyo"
3. Click search
4. Check country code display

**Expected Result**:
- ✅ Shows "Tokyo, JP" (NOT "IN")
- ✅ Subtitle shows: "Tokyo, Tokyo, Japan"
- ✅ Country code is correctly "JP"
- ✅ Weather data fetches for Tokyo

**Pass/Fail**: _______________

### Test 3b: Search London
**Steps**:
1. Type "London"
2. Click search

**Expected Result**:
- ✅ Shows "London, GB" (NOT "IN")
- ✅ Country code correctly shows "GB"
- ✅ Weather updates for London

**Pass/Fail**: _______________

### Test 3c: Search New York
**Steps**:
1. Type "New York"
2. Click search

**Expected Result**:
- ✅ Shows "New York, US"
- ✅ Country code is "US"

**Pass/Fail**: _______________

---

## Test Case 4: Map Click Functionality (Reverse Geocoding)

**Objective**: Verify clicking on map fetches correct location and country code

### Test 4a: Click on India (Around Delhi)
**Steps**:
1. Scroll down to see map
2. Click somewhere in India (around lat=28, lon=77)
3. Wait for weather to load
4. Check location display

**Expected Result**:
- ✅ Location updates to nearest city (Delhi or similar)
- ✅ Shows country code "IN"
- ✅ Weather data loads for clicked location
- ✅ Map marker moves to click point

**Pass/Fail**: _______________

### Test 4b: Click on Japan
**Steps**:
1. Click somewhere in Japan (around lat=36, lon=138)
2. Wait for weather data to load
3. Check country code display

**Expected Result**:
- ✅ Shows country code "JP" (NOT "IN")
- ✅ Location shows Japanese city name
- ✅ Weather updates for Japanese location
- ✅ Map updates correctly

**Pass/Fail**: _______________

### Test 4c: Click on USA
**Steps**:
1. Click somewhere in USA (around lat=40, lon=-95)
2. Wait for data to load

**Expected Result**:
- ✅ Shows country code "US"
- ✅ Location shows US city
- ✅ Weather for US location displays

**Pass/Fail**: _______________

---

## Test Case 5: Weather Data Display

**Objective**: Verify all weather components display correctly

### Test 5a: Current Weather Card
**Steps**:
1. Ensure weather card is visible
2. Check all data fields

**Expected Result**:
- ✅ Location name and country code visible
- ✅ Large temperature display (number + °C)
- ✅ Weather condition text (Clear, Rainy, etc.)
- ✅ Humidity percentage
- ✅ Wind speed in m/s
- ✅ Pressure in hPa
- ✅ Weather icon (sun, cloud, etc.)

**Pass/Fail**: _______________

### Test 5b: 7-Day Forecast
**Steps**:
1. Scroll to forecast section
2. Count forecast cards

**Expected Result**:
- ✅ 7 cards displayed
- ✅ Each card shows: date, min/max temp, weather icon
- ✅ Cards are evenly spaced and readable

**Pass/Fail**: _______________

### Test 5c: Hourly Temperature Chart
**Steps**:
1. Scroll to chart section
2. Observe temperature chart

**Expected Result**:
- ✅ Line chart displays with 24-hour data
- ✅ X-axis shows hours (0-23)
- ✅ Y-axis shows temperature scale
- ✅ Chart is interactive (hover shows values)

**Pass/Fail**: _______________

---

## Test Case 6: Dark Mode Toggle

**Objective**: Verify theme switching works

### Test 6a: Toggle Dark Mode
**Steps**:
1. Locate "Dark" or "Light" button in top-right
2. Click the button
3. Observe UI changes

**Expected Result**:
- ✅ Button text changes (Dark → Light or vice versa)
- ✅ Background changes (white → dark or vice versa)
- ✅ Text color adjusts for contrast
- ✅ Cards have dark background in dark mode

**Pass/Fail**: _______________

### Test 6b: Theme Persistence (Optional)
**Steps**:
1. Set to dark mode
2. Refresh page (F5)
3. Check if theme persists

**Expected Result**:
- ✅ Page remains in dark mode after refresh (if implemented)
- ⚠️ If not persisted, it's acceptable for now

**Pass/Fail**: _______________

---

## Test Case 7: Recent Searches

**Objective**: Verify search history persists and works

### Test 7a: Search Multiple Cities
**Steps**:
1. Search "Delhi"
2. Search "Mumbai"
3. Search "Bangalore"
4. Scroll down to "Recent Searches" section

**Expected Result**:
- ✅ Recent searches list shows (Bangalore, Mumbai, Delhi)
- ✅ Most recent appears first
- ✅ Max 6 items displayed

**Pass/Fail**: _______________

### Test 7b: Click Recent Search
**Steps**:
1. In "Recent Searches" list, click "Mumbai"
2. Wait for weather to load

**Expected Result**:
- ✅ Weather updates to Mumbai
- ✅ Location displays correctly
- ✅ No console errors

**Pass/Fail**: _______________

### Test 7c: Persistence After Refresh
**Steps**:
1. Note the recent searches showing
2. Refresh page (F5)
3. Scroll to Recent Searches section

**Expected Result**:
- ✅ Same recent searches appear after refresh
- ✅ Data persists in localStorage

**Pass/Fail**: _______________

---

## Test Case 8: Cache and Fallback Behavior

**Objective**: Verify caching and API fallback works

### Test 8a: Run Automated Tests
**Steps**:
1. Open DevTools (F12)
2. Go to Console tab
3. Copy-paste content from `TEST_SUITE.js`
4. Call: `runAllTests()`

**Expected Result**:
- ✅ Tests run and show results
- ✅ Most tests show "PASS" or "WARN"
- ✅ Nominatim API responds with correct data
- ✅ OpenWeatherMap responds with weather

**Pass/Fail**: _______________

### Test 8b: Repeated Search (Cache Hit)
**Steps**:
1. Search "Delhi" and note load time (~2-3s)
2. Search different city (e.g., "Tokyo")
3. Search "Delhi" again
4. Check console for cache hit message

**Expected Result**:
- ✅ Second Delhi search loads faster (cached)
- ✅ Same weather data displays
- ✅ Console shows cache hit (if logging enabled)

**Pass/Fail**: _______________

---

## Test Case 9: Error Handling

**Objective**: Verify app handles errors gracefully

### Test 9a: Invalid Search
**Steps**:
1. Type gibberish city name: "xyzabc123"
2. Click search

**Expected Result**:
- ⚠️ App either:
  - Shows error message, OR
  - Falls back to demo data with "Demo Mode" badge
- ✅ App doesn't crash
- ✅ No unhandled console errors

**Pass/Fail**: _______________

### Test 9b: Offline Mode (Optional)
**Steps**:
1. Open DevTools Network tab
2. Go Offline (Network → Offline)
3. Try to search new city
4. Go back Online

**Expected Result**:
- ⚠️ App shows demo data or cached data
- ✅ App doesn't crash
- ✅ Shows "Demo Mode" badge when offline

**Pass/Fail**: _______________

---

## Test Case 10: Admin Hierarchy Display

**Objective**: Verify full place hierarchy displays correctly

### Test 10a: Indian Village
**Steps**:
1. Search "Anantapur" (or any small Indian town)
2. Look at subtitle under location name

**Expected Result**:
- ✅ Shows hierarchy like: "Village, District, State, Country"
- ✅ All levels display when available
- ✅ Formatting is readable

**Pass/Fail**: _______________

### Test 10b: International City
**Steps**:
1. Search "Tokyo"
2. Check subtitle for hierarchy

**Expected Result**:
- ✅ Shows: "Tokyo, Tokyo Prefecture, Japan" or similar
- ✅ Displays all available hierarchy levels

**Pass/Fail**: _______________

---

## Summary

| Test | Status | Notes |
|------|--------|-------|
| Test 1: App Init | ____ | |
| Test 2a: Delhi | ____ | |
| Test 2b: Anantapur | ____ | |
| Test 2c: Mumbai | ____ | |
| Test 3a: Tokyo | ____ | |
| Test 3b: London | ____ | |
| Test 3c: New York | ____ | |
| Test 4a: Map India | ____ | |
| Test 4b: Map Japan | ____ | |
| Test 4c: Map USA | ____ | |
| Test 5a: Current Weather | ____ | |
| Test 5b: 7-Day Forecast | ____ | |
| Test 5c: Hourly Chart | ____ | |
| Test 6a: Dark Mode | ____ | |
| Test 6b: Theme Persist | ____ | |
| Test 7a: Recent Searches | ____ | |
| Test 7b: Click Recent | ____ | |
| Test 7c: Refresh Persist | ____ | |
| Test 8a: Auto Tests | ____ | |
| Test 8b: Cache | ____ | |
| Test 9a: Error Handle | ____ | |
| Test 9b: Offline | ____ | |
| Test 10a: Village | ____ | |
| Test 10b: Intl City | ____ | |

**Total Pass**: ____ / 24
**Total Fail**: ____ / 24

**Overall Result**: ✅ PASS / ❌ FAIL

---

## Bug Report (if any)

**Issue**: 
**Steps to Reproduce**:
**Expected**:
**Actual**:
**Screenshot**: (if applicable)

---

## Notes

- All tests should complete within 5-10 minutes
- App should be responsive and not lag
- No console errors (warnings are acceptable)
- Check browser Network tab if loading is slow
