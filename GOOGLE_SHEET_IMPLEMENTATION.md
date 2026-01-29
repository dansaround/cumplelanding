# Google Sheets Implementation Documentation

## Overview

This project uses Google Sheets as a backend database for form submissions. The form data is sent to a Google Apps Script (Web App) that processes the data and stores it in a Google Sheet.

## Current Implementation

### Architecture

```
[React Form] --> [Google Apps Script (Web App)] --> [Google Sheet]
```

### Frontend (React)

**File:** `src/components/Header.tsx`

#### Current Form Fields

| Field | Type | Validation | Required |
|-------|------|------------|----------|
| `nombre` | string | min 1 character | Yes |
| `cumpleanos` | string | dd/mm/yyyy format | Yes |
| `email` | string | valid email format | Yes |
| `telefono` | string | min 1 character | Yes |
| `dni` | string | none | No |

#### Technologies Used

- **Zod**: Schema validation
- **Jotai**: State management
- **Fetch API**: HTTP requests with `mode: "no-cors"`

#### Form Submission Flow

1. User fills out the form
2. Zod validates the data on submit
3. If valid, data is sent via POST to Google Apps Script URL
4. Google Apps Script receives the data and writes to Google Sheet
5. User sees success/error message

### Google Apps Script (Backend)

**Current URL:**
```
https://script.google.com/macros/s/AKfycbyNoVhmjqHCc4CmnOxhK2vjGujln0WDomPX_Kawo6YuVnwsPO-bOUk3OoU1gDciUC-u-Q/exec
```

#### Expected Script Structure

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Append row with form data
    sheet.appendRow([
      new Date(),        // Timestamp
      data.nombre,
      data.cumpleanos,
      data.email,
      data.telefono,
      data.dni || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Creating a New Form with Different Fields

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Add column headers in the first row matching your form fields
4. Example: `Timestamp | Name | Email | Phone | Message`

### Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Replace the default code with:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Customize this array to match your form fields
    sheet.appendRow([
      new Date(),           // Timestamp (always recommended)
      data.fieldName1,      // Replace with your field names
      data.fieldName2,
      data.fieldName3,
      // ... add more fields as needed
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Handle GET requests for testing
function doGet() {
  return ContentService
    .createTextOutput("Form endpoint is working!")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

3. Save the project (Ctrl+S)

### Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon and select **Web app**
3. Configure:
   - **Description**: Your form name
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Authorize the app when prompted
6. Copy the **Web app URL** (this is your `GOOGLE_SCRIPT_URL`)

### Step 4: Update Frontend Code

#### 4.1 Define Zod Schema

```typescript
const formSchema = z.object({
  fieldName1: z.string().min(1, "Field 1 is required"),
  fieldName2: z.string().email("Invalid email"),
  fieldName3: z.string().optional(),
  // Add validation for each field
});

type FormData = z.infer<typeof formSchema>;
```

#### 4.2 Create Jotai Atoms

```typescript
const formDataAtom = atom<FormData>({
  fieldName1: "",
  fieldName2: "",
  fieldName3: "",
  // Initialize all fields
});

const formErrorsAtom = atom<Partial<Record<keyof FormData, string>>>({});
const isLoadingAtom = atom(false);
const submitMessageAtom = atom<{ type: "success" | "error"; text: string } | null>(null);
```

#### 4.3 Update Google Script URL

```typescript
const GOOGLE_SCRIPT_URL = "YOUR_NEW_WEB_APP_URL_HERE";
```

#### 4.4 Create Form JSX

```tsx
<form onSubmit={handleSubmit}>
  <input
    type="text"
    value={formData.fieldName1}
    onChange={(e) => updateField("fieldName1", e.target.value)}
  />
  {/* Add more inputs for each field */}
  <button type="submit" disabled={isLoading}>
    {isLoading ? "Sending..." : "Submit"}
  </button>
</form>
```

---

## Important Notes

### CORS Considerations

The current implementation uses `mode: "no-cors"` because Google Apps Script doesn't support CORS headers properly. This means:

- You cannot read the response from the server
- Success is assumed if no network error occurs
- For better error handling, consider using a proxy server or Google Forms API

### Security Considerations

- The Google Apps Script URL is public and can receive requests from anyone
- Consider adding validation in the Apps Script to prevent spam
- Don't store sensitive data without proper security measures

### Updating the Script

When you modify the Google Apps Script:

1. Save your changes
2. Go to **Deploy > Manage deployments**
3. Click the pencil icon to edit
4. Select **New version** in the Version dropdown
5. Click **Deploy**

The URL remains the same, but the new code will be active.

### Rate Limits

Google Apps Script has quotas:
- 20,000 URL fetch calls per day
- 6 minutes max execution time
- See [Google's quotas](https://developers.google.com/apps-script/guides/services/quotas) for details

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Form submits but no data in sheet | Check field names match between frontend and Apps Script |
| CORS errors in console | Ensure using `mode: "no-cors"` in fetch |
| Script authorization error | Re-deploy and authorize the app |
| Data appears in wrong columns | Verify the order in `sheet.appendRow()` matches sheet columns |
