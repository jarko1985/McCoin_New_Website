# Testing Guide for Fix #1: Authorization Checks

## Overview
This guide helps you test the authorization fixes applied to ticket endpoints.

## Prerequisites
1. Start your development server: `npm run dev`
2. Have at least 2 test user accounts ready (or create them)
3. Have a tool to make HTTP requests (Postman, curl, or browser DevTools)

---

## Test Scenarios

### Test 1: Unauthenticated Access (Should Fail)
**Purpose:** Verify that unauthenticated users cannot access tickets.

#### Test 1.1: GET /api/tickets (without auth)
```bash
curl -X GET http://localhost:3000/api/tickets
```

**Expected Result:** 
- Status: `401 Unauthorized`
- Response: `{ "error": "Unauthorized", "message": "Authentication required" }`

#### Test 1.2: GET /api/tickets/[id] (without auth)
```bash
curl -X GET http://localhost:3000/api/tickets/SOME_TICKET_ID
```

**Expected Result:** 
- Status: `401 Unauthorized`

#### Test 1.3: POST /api/tickets (without auth)
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{"subject":"Test","description":"Test","category":"technical","priority":"medium"}'
```

**Expected Result:** 
- Status: `401 Unauthorized`

---

### Test 2: Authenticated Access (Should Succeed)
**Purpose:** Verify that authenticated users can access their own tickets.

#### Step 1: Login and Get Session Cookie
1. Login through your app UI at `/en/login`
2. Open browser DevTools → Application/Storage → Cookies
3. Copy the `next-auth.session-token` cookie value

#### Step 2: Test GET /api/tickets (with auth)
```bash
curl -X GET http://localhost:3000/api/tickets \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

**Expected Result:** 
- Status: `200 OK`
- Response: `{ "tickets": [...], "stats": {...} }`

#### Step 3: Create a Ticket (POST /api/tickets)
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -F "subject=Test Ticket" \
  -F "description=This is a test ticket" \
  -F "category=technical" \
  -F "priority=medium"
```

**Expected Result:** 
- Status: `200 OK`
- Response: Ticket object with `id` field
- **Save the ticket `id` for next tests**

#### Step 4: Get Specific Ticket (GET /api/tickets/[id])
```bash
curl -X GET http://localhost:3000/api/tickets/YOUR_TICKET_ID \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

**Expected Result:** 
- Status: `200 OK`
- Response: Ticket object

---

### Test 3: Cross-User Access (Should Fail - CRITICAL TEST)
**Purpose:** Verify users cannot access other users' tickets.

#### Step 1: Login as User A
- Create/get a ticket as User A
- Save the ticket ID

#### Step 2: Login as User B
- Get User B's session token

#### Step 3: Try to Access User A's Ticket
```bash
curl -X GET http://localhost:3000/api/tickets/USER_A_TICKET_ID \
  -H "Cookie: next-auth.session-token=USER_B_SESSION_TOKEN"
```

**Expected Result:** 
- Status: `403 Forbidden`
- Response: `{ "error": "Forbidden", "message": "You do not have permission to access this ticket" }`

#### Step 4: Try to Update User A's Ticket
```bash
curl -X PATCH http://localhost:3000/api/tickets/USER_A_TICKET_ID \
  -H "Cookie: next-auth.session-token=USER_B_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"subject":"Hacked"}'
```

**Expected Result:** 
- Status: `403 Forbidden`

#### Step 5: Try to Delete User A's Ticket
```bash
curl -X DELETE http://localhost:3000/api/tickets/USER_A_TICKET_ID \
  -H "Cookie: next-auth.session-token=USER_B_SESSION_TOKEN"
```

**Expected Result:** 
- Status: `403 Forbidden`

---

### Test 4: Comments Endpoint Authorization
**Purpose:** Verify comments endpoints are protected.

#### Test 4.1: GET Comments (without auth)
```bash
curl -X GET http://localhost:3000/api/tickets/SOME_TICKET_ID/comments
```

**Expected Result:** 
- Status: `401 Unauthorized`

#### Test 4.2: POST Comment (without auth)
```bash
curl -X POST http://localhost:3000/api/tickets/SOME_TICKET_ID/comments \
  -H "Content-Type: application/json" \
  -d '{"content":"Test comment"}'
```

**Expected Result:** 
- Status: `401 Unauthorized`

#### Test 4.3: POST Comment to Another User's Ticket
```bash
curl -X POST http://localhost:3000/api/tickets/USER_A_TICKET_ID/comments \
  -H "Cookie: next-auth.session-token=USER_B_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"Hacked comment"}'
```

**Expected Result:** 
- Status: `403 Forbidden`

---

## Using Browser DevTools (Easier Method)

### Step 1: Login via UI
1. Go to `http://localhost:3000/en/login`
2. Login with test credentials
3. Open DevTools (F12) → Network tab

### Step 2: Test via Browser Console
```javascript
// Test GET /api/tickets
fetch('/api/tickets', {
  credentials: 'include' // Important: includes cookies
})
.then(r => r.json())
.then(console.log)
.catch(console.error);

// Test GET specific ticket (replace TICKET_ID)
fetch('/api/tickets/TICKET_ID', {
  credentials: 'include'
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

### Step 3: Check Response Status
- Look at the Network tab
- Check Status Code column
- Should see `401` for unauthenticated, `200` for authenticated, `403` for forbidden

---

## Quick Verification Checklist

- [ ] Unauthenticated GET /api/tickets returns 401
- [ ] Unauthenticated POST /api/tickets returns 401
- [ ] Authenticated GET /api/tickets returns 200 with user's tickets
- [ ] Authenticated POST /api/tickets creates ticket successfully
- [ ] Authenticated GET /api/tickets/[id] returns ticket if owned by user
- [ ] User B cannot GET User A's ticket (returns 403)
- [ ] User B cannot PATCH User A's ticket (returns 403)
- [ ] User B cannot DELETE User A's ticket (returns 403)
- [ ] User B cannot POST comment to User A's ticket (returns 403)
- [ ] No userId parameter is required/used in requests

---

## Common Issues & Troubleshooting

### Issue: Getting 500 Internal Server Error
**Solution:** Check server logs. May be MongoDB connection issue or missing environment variables.

### Issue: Getting 200 but empty tickets array
**Solution:** This is expected if user has no tickets. Create a ticket first.

### Issue: Session not working
**Solution:** 
- Verify `NEXTAUTH_SECRET` is set in `.env`
- Check that cookies are being sent (use `credentials: 'include'` in fetch)
- Verify NextAuth is properly configured

### Issue: Still able to access other user's tickets
**Solution:** 
- Check that you're using different session tokens for different users
- Verify the security.ts file is being imported correctly
- Check server logs for any errors

---

## Expected Behavior Summary

| Endpoint | No Auth | Wrong User | Correct User |
|----------|---------|------------|--------------|
| GET /api/tickets | 401 | N/A | 200 |
| POST /api/tickets | 401 | N/A | 200 |
| GET /api/tickets/[id] | 401 | 403 | 200 |
| PATCH /api/tickets/[id] | 401 | 403 | 200 |
| DELETE /api/tickets/[id] | 401 | 403 | 200 |
| GET /api/tickets/[id]/comments | 401 | 403 | 200 |
| POST /api/tickets/[id]/comments | 401 | 403 | 200 |

---

## Next Steps After Testing

If all tests pass:
- ✅ Fix #1 is working correctly
- Proceed to Fix #2: Input Validation & Sanitization

If any tests fail:
- Check server logs for errors
- Verify MongoDB connection
- Ensure NextAuth is properly configured
- Review the security.ts implementation

