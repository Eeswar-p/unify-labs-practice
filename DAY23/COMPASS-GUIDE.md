# MongoDB Compass Visual Guide
# DAY23: Step-by-Step Screenshots Guide

## 🖼️ Visual Walkthrough

This guide provides detailed instructions for using MongoDB Compass GUI.

---

## Step 1: Opening MongoDB Compass

1. **Launch Application:**
   - Press Windows key
   - Type "MongoDB Compass"
   - Click on the application icon

2. **First Launch:**
   - You'll see the welcome screen with connection options

---

## Step 2: Connecting to MongoDB

### Connection Screen

```
┌─────────────────────────────────────────────────┐
│  New Connection                                 │
│                                                 │
│  URI:  mongodb://localhost:27017                │
│                                                 │
│  [Advanced Connection Options ▼]               │
│                                                 │
│                    [Cancel]  [Connect]          │
└─────────────────────────────────────────────────┘
```

**What to do:**
1. Ensure the URI field shows: `mongodb://localhost:27017`
2. Click the green **"Connect"** button
3. Wait 2-3 seconds for connection

**Success Indicator:**
- Left sidebar shows: `admin`, `config`, `local` databases

---

## Step 3: Creating Database

### Method: GUI Way

1. **Click "+" Button:**
   - Look at the left sidebar
   - Find the "+ CREATE DATABASE" button (or "+" icon next to "Databases")
   - Click it

2. **Fill Database Form:**

```
┌─────────────────────────────────────────────────┐
│  Create Database                                │
│                                                 │
│  Database Name:                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ unify_labs                                │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  Collection Name:                               │
│  ┌───────────────────────────────────────────┐ │
│  │ interns                                   │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  [ ] Capped Collection                         │
│                                                 │
│            [Cancel]  [Create Database]          │
└─────────────────────────────────────────────────┘
```

3. **Click "Create Database"**

**Success Indicator:**
- `unify_labs` appears in the left sidebar
- Click on it to expand and see `interns` collection

---

## Step 4: Viewing Collection

### Collection Screen

```
┌────────────────────────────────────────────────────────┐
│  unify_labs > interns                                  │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [Documents] [Aggregations] [Schema] [Explain Plan]   │
│                                                        │
│  Filter: { }                            [ADD DATA ▼]   │
│  ─────────────────────────────────────────────────     │
│                                                        │
│  No documents found                                    │
│                                                        │
└────────────────────────────────────────────────────────┘
```

**You should see:**
- Tab: "Documents" (active)
- "ADD DATA" dropdown button (top right)
- Empty collection message

---

## Step 5: Inserting Documents

### Insert First Document

1. **Click "ADD DATA" Dropdown:**
   - Select "Insert Document"

2. **Document Editor Opens:**

```
┌────────────────────────────────────────────────────────┐
│  Insert to unify_labs.interns                          │
├────────────────────────────────────────────────────────┤
│                                                        │
│  {                                                     │
│    "_id": {                                            │
│      "$oid": "65f1a2b3c4d5e6f7g8h9i0j1"               │
│    }                                                   │
│  }                                                     │
│                                                        │
│  [Cancel]                              [Insert]        │
└────────────────────────────────────────────────────────┘
```

3. **Replace Content With:**

```json
{
  "name": "Alice Johnson",
  "role": "Frontend Developer",
  "joinedDate": "2024-01-15"
}
```

**Important:**
- Delete the auto-generated `_id` field (MongoDB will create one)
- Or keep it and add your fields after

4. **Click Green "Insert" Button**

**Success Indicator:**
- Document appears in the list
- You see `_id`, `name`, `role`, `joinedDate` fields

### Insert Second Document

1. Click "ADD DATA" → "Insert Document" again
2. Enter:

```json
{
  "name": "Bob Smith",
  "role": "Backend Developer",
  "joinedDate": "2024-02-01"
}
```

3. Click "Insert"

### Insert Third Document

1. Click "ADD DATA" → "Insert Document" again
2. Enter:

```json
{
  "name": "Carol Martinez",
  "role": "Full Stack Developer",
  "joinedDate": "2024-03-10"
}
```

3. Click "Insert"

---

## Step 6: Viewing Inserted Documents

### Documents View

After inserting all 3 documents, you should see:

```
┌────────────────────────────────────────────────────────────────┐
│  unify_labs > interns                              Documents: 3 │
├────────────────────────────────────────────────────────────────┤
│  [Documents] [Aggregations] [Schema] [Explain Plan] [Indexes]  │
│                                                                │
│  Filter: { }                                    [ADD DATA ▼]   │
│  ──────────────────────────────────────────────────────────    │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ _id: ObjectId("65f1a...")                               │ │
│  │ name: "Alice Johnson"                                    │ │
│  │ role: "Frontend Developer"                               │ │
│  │ joinedDate: "2024-01-15"                                 │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ _id: ObjectId("65f1b...")                               │ │
│  │ name: "Bob Smith"                                        │ │
│  │ role: "Backend Developer"                                │ │
│  │ joinedDate: "2024-02-01"                                 │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ _id: ObjectId("65f1c...")                               │ │
│  │ name: "Carol Martinez"                                   │ │
│  │ role: "Full Stack Developer"                             │ │
│  │ joinedDate: "2024-03-10"                                 │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Top right shows: "Documents: 3"
- Each document displayed in a card
- All 3 documents visible

---

## Step 7: Querying Documents

### Using the Filter Bar

**Find Frontend Developer:**

1. In the Filter field, type:
   ```json
   { "role": "Frontend Developer" }
   ```

2. Press Enter or click "Find"

3. **Result:** Only Alice Johnson's document shows

**Find by Date Range:**

1. In the Filter field, type:
   ```json
   { "joinedDate": { "$gte": "2024-02-01" } }
   ```

2. Press Enter

3. **Result:** Shows Bob Smith and Carol Martinez (joined Feb 1 or later)

**Clear Filter:**

1. Delete filter text
2. Press Enter
3. **Result:** All 3 documents visible again

---

## Step 8: Editing a Document

1. **Hover Over a Document:**
   - You'll see a pencil icon (✏️) appear on the right

2. **Click the Pencil Icon:**
   - Document switches to edit mode

3. **Modify a Field:**
   ```json
   {
     "_id": ObjectId("..."),
     "name": "Alice Johnson",
     "role": "Senior Frontend Developer",  ← Changed
     "joinedDate": "2024-01-15"
   }
   ```

4. **Click "Update" Button:**
   - Changes are saved

**Success Indicator:**
- Document updates in the list
- Green notification: "Document updated"

---

## Step 9: Deleting a Document

**⚠️ Warning:** This permanently removes the document!

1. **Hover Over a Document:**
   - You'll see a trash icon (🗑️) appear on the right

2. **Click the Trash Icon:**
   - Confirmation dialog appears

3. **Confirm Deletion:**
   - Click "Delete"

**Success Indicator:**
- Document disappears from list
- Document count decreases

**To Undo:**
- Re-insert the document manually

---

## Step 10: Viewing Collection Stats

1. **Click "Schema" Tab:**
   - See field types and value distributions

2. **Click "Indexes" Tab:**
   - View existing indexes (default: `_id` index)

3. **Click "Explain Plan" Tab:**
   - Analyze query performance

---

## Common Actions Quick Reference

| Action | Steps |
|--------|-------|
| **Connect** | URI: `mongodb://localhost:27017` → Connect |
| **Create DB** | "+ CREATE DATABASE" → Enter names → Create |
| **Insert Doc** | ADD DATA → Insert Document → Enter JSON → Insert |
| **View All** | Click collection name → Documents tab |
| **Filter** | Type query in Filter bar → Enter |
| **Edit Doc** | Hover → Pencil icon → Modify → Update |
| **Delete Doc** | Hover → Trash icon → Confirm |
| **Refresh** | Click refresh icon (↻) in top bar |

---

## Keyboard Shortcuts

- **Ctrl + K**: Focus search/filter bar
- **Ctrl + N**: New connection
- **Ctrl + R**: Refresh collection
- **Ctrl + W**: Close current tab
- **Ctrl + T**: New tab

---

## Troubleshooting Visual Issues

### Issue: Can't See "Connect" Button

**Solution:** Scroll down in the connection window

### Issue: Documents Appear Collapsed

**Solution:** Click the "▶" arrow on the left of each document to expand

### Issue: Filter Not Working

**Solution:** 
- Ensure JSON syntax is correct (use double quotes)
- Check for typos in field names
- Clear cache: View → Reload

---

## 🎉 Success Checklist

After completing this guide, you should see:

- ✅ MongoDB Compass connected to localhost:27017
- ✅ `unify_labs` database in left sidebar
- ✅ `interns` collection under `unify_labs`
- ✅ 3 documents displayed (Alice, Bob, Carol)
- ✅ Each document has: `_id`, `name`, `role`, `joinedDate`
- ✅ "Documents: 3" shown in top right of collection view

---

**Next:** Try the filter examples and practice editing documents!
