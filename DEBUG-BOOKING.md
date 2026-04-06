# Debugging Booking Issues

## 🔍 **Step 1: Check Browser Console**
1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Try submitting a booking form
4. Look for error messages like:
   - "Supabase error details" (with specific error info)
   - CORS errors
   - Network errors

## 🌐 **Step 2: Check CORS Settings**
In your Supabase dashboard:
1. Go to **Project Settings** → **"API"**
2. Scroll down to **"Additional Configuration"**
3. Make sure these URLs are in **"Allowed Origins"**:
   - `http://localhost:8080`
   - `http://localhost:3000`
   - `http://127.0.0.1:8080`
   - `http://127.0.0.1:3000`

## 🗄️ **Step 3: Verify Database Tables**
In Supabase dashboard:
1. Go to **"Table Editor"**
2. Check if you can see:
   - `bookings` table
   - `user_roles` table
3. Click on `bookings` table to see its structure

## 🔧 **Step 4: Test Direct API Call**
Open browser console and run:
```javascript
// Test if Supabase is working
fetch('https://jkqnykattrrgluqyqtoa.supabase.co/rest/v1/', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprcW55a2F0dHJyZ2x1cXlxdG9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NjE5NDMsImV4cCI6MjA5MTAzNzk0M30.YmJkOgpbmhWJ8WYgI3QuZxQ78CrSXS_RWs22sb4L7sg',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprcW55a2F0dHJyZ2x1cXlxdG9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NjE5NDMsImV4cCI6MjA5MTAzNzk0M30.YmJkOgpbmhWJ8WYgI3QuZxQ78CrSXS_RWs22sb4L7sg'
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

## 🚨 **Common Issues & Solutions**

### Issue: "CORS policy error"
**Solution**: Add localhost to allowed origins (Step 2)

### Issue: "Table doesn't exist"
**Solution**: Run the SQL setup again from the guide

### Issue: "Permission denied"
**Solution**: Check RLS policies were created correctly

### Issue: "Invalid API key"
**Solution**: Verify your .env file has correct keys

## 📞 **What to Report Back**
Please share:
1. Console error messages
2. Network tab errors (if any)
3. Whether the direct API test worked
4. Screenshots of your Supabase table editor

This will help me identify the exact issue!
