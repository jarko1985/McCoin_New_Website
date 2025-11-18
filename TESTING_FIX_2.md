# Testing Guide for Fix #2: Input Validation & Sanitization

## Overview
This guide helps you test the input validation and sanitization fixes applied to all API endpoints.

## Prerequisites
1. Start your development server: `npm run dev`
2. Have a tool to make HTTP requests (Postman, curl, or browser DevTools)
3. Have test user accounts ready

---

## Test Scenarios

### Test 1: Signup Endpoint Validation

#### Test 1.1: Valid Signup (Should Succeed)
```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "SecurePass123!"
  }'
```

**Expected Result:** 
- Status: `200 OK`
- Response: `{ "success": true, "message": "Account created successfully..." }`

#### Test 1.2: Weak Password (Should Fail)
```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "weak"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error message about password requirements

#### Test 1.3: Password Missing Requirements
Test each missing requirement:
- No uppercase: `"password": "securepass123!"`
- No lowercase: `"password": "SECUREPASS123!"`
- No number: `"password": "SecurePass!"`
- No special char: `"password": "SecurePass123"`
- Too short: `"password": "Pass1!"`

**Expected Result:** All should return `400` with specific error message

#### Test 1.4: Invalid Email Format
```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "invalid-email",
    "password": "SecurePass123!"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Invalid email address"

#### Test 1.5: Name Too Short
```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "J",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Name must be at least 2 characters"

#### Test 1.6: Name with Invalid Characters
```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John <script>alert(1)</script>",
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request` OR name is sanitized (angle brackets removed)

---

### Test 2: Login Endpoint Validation

#### Test 2.1: Invalid Email Format
```bash
curl -X POST http://localhost:3000/api/check-user-status \
  -H "Content-Type: application/json" \
  -d '{
    "email": "not-an-email",
    "password": "anypassword"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Invalid email address"

#### Test 2.2: Missing Password
```bash
curl -X POST http://localhost:3000/api/check-user-status \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Password is required"

---

### Test 3: Password Reset Validation

#### Test 3.1: Invalid Email Format
```bash
curl -X POST http://localhost:3000/api/forgot-password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Invalid email address"

#### Test 3.2: Reset Password with Weak Password
```bash
curl -X POST http://localhost:3000/api/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "valid-token-here",
    "email": "user@example.com",
    "newPassword": "weak"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error about password requirements

#### Test 3.3: Invalid Token Format
```bash
curl -X POST http://localhost:3000/api/reset-password \
  -H "Content-Type: application/json" \
  -d '{
    "token": "short",
    "email": "user@example.com",
    "newPassword": "SecurePass123!"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Token must be at least 32 characters"

---

### Test 4: Ticket Creation Validation

#### Test 4.1: Valid Ticket (Should Succeed)
First, login and get session cookie, then:
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -F "subject=Test Ticket" \
  -F "description=This is a valid ticket description with enough content" \
  -F "category=technical" \
  -F "priority=medium"
```

**Expected Result:** 
- Status: `200 OK`
- Response: Ticket object

#### Test 4.2: Subject Too Short
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -F "subject=Hi" \
  -F "description=Valid description here" \
  -F "category=technical" \
  -F "priority=medium"
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Subject must be at least 3 characters"

#### Test 4.3: Description Too Short
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -F "subject=Valid Subject" \
  -F "description=Short" \
  -F "category=technical" \
  -F "priority=medium"
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Description must be at least 10 characters"

#### Test 4.4: Invalid Category
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -F "subject=Valid Subject" \
  -F "description=Valid description here" \
  -F "category=invalid_category" \
  -F "priority=medium"
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error about invalid category

#### Test 4.5: Invalid Priority
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -F "subject=Valid Subject" \
  -F "description=Valid description here" \
  -F "category=technical" \
  -F "priority=invalid_priority"
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error about invalid priority

#### Test 4.6: XSS Attack in Subject (Should be Sanitized)
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -F "subject=<script>alert('XSS')</script>Test" \
  -F "description=Valid description here" \
  -F "category=technical" \
  -F "priority=medium"
```

**Expected Result:** 
- Status: `200 OK` (if sanitized) OR `400 Bad Request`
- If successful, check database - angle brackets should be removed from subject

#### Test 4.7: XSS Attack in Description (Should be Sanitized)
```bash
curl -X POST http://localhost:3000/api/tickets \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -F "subject=Valid Subject" \
  -F "description=<script>alert('XSS')</script><img src=x onerror=alert(1)>" \
  -F "category=technical" \
  -F "priority=medium"
```

**Expected Result:** 
- Status: `200 OK`
- Check database - HTML tags should be removed from description

#### Test 4.8: Description Too Long
```bash
# Create a string with 10001 characters
LONG_DESC=$(python -c "print('A' * 10001)")

curl -X POST http://localhost:3000/api/tickets \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -F "subject=Valid Subject" \
  -F "description=$LONG_DESC" \
  -F "category=technical" \
  -F "priority=medium"
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Description must be less than 10000 characters"

---

### Test 5: Ticket Update Validation

#### Test 5.1: Update with XSS (Should be Sanitized)
```bash
curl -X PATCH http://localhost:3000/api/tickets/TICKET_ID \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "<script>alert(1)</script>Updated",
    "description": "<img src=x onerror=alert(1)>"
  }'
```

**Expected Result:** 
- Status: `200 OK`
- Check database - HTML should be sanitized

#### Test 5.2: Invalid Status Value
```bash
curl -X PATCH http://localhost:3000/api/tickets/TICKET_ID \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "invalid_status"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error about invalid status

---

### Test 6: Comment Validation

#### Test 6.1: Valid Comment (Should Succeed)
```bash
curl -X POST http://localhost:3000/api/tickets/TICKET_ID/comments \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is a valid comment"
  }'
```

**Expected Result:** 
- Status: `200 OK`

#### Test 6.2: Empty Comment
```bash
curl -X POST http://localhost:3000/api/tickets/TICKET_ID/comments \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": ""
  }'
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Comment cannot be empty"

#### Test 6.3: Comment Too Long
```bash
# Create a string with 5001 characters
LONG_COMMENT=$(python -c "print('A' * 5001)")

curl -X POST http://localhost:3000/api/tickets/TICKET_ID/comments \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"content\": \"$LONG_COMMENT\"
  }"
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Comment must be less than 5000 characters"

#### Test 6.4: XSS in Comment (Should be Sanitized)
```bash
curl -X POST http://localhost:3000/api/tickets/TICKET_ID/comments \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "<script>alert(\"XSS\")</script>Comment text"
  }'
```

**Expected Result:** 
- Status: `200 OK`
- Check database - HTML tags should be removed

---

### Test 7: 2FA Token Validation

#### Test 7.1: Invalid TOTP Token Format
```bash
curl -X POST http://localhost:3000/api/2fa/verify \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "12345"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "2FA token must be 6 digits"

#### Test 7.2: TOTP Token with Letters
```bash
curl -X POST http://localhost:3000/api/2fa/verify \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "ABC123"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "2FA token must be 6 digits"

#### Test 7.3: Valid TOTP Token Format (but may be invalid)
```bash
curl -X POST http://localhost:3000/api/2fa/verify \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "123456"
  }'
```

**Expected Result:** 
- Status: `400 Bad Request` (if token is wrong) OR `200 OK` (if token is correct)
- Should NOT return format error if format is correct

---

### Test 8: Ticket ID Format Validation

#### Test 8.1: Invalid Ticket ID Format
```bash
curl -X GET http://localhost:3000/api/tickets/invalid-id \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Invalid ticket ID format"

#### Test 8.2: Ticket ID Too Short
```bash
curl -X GET http://localhost:3000/api/tickets/abc123 \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN"
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Invalid ticket ID format"

---

### Test 9: Email Verification Validation

#### Test 9.1: Invalid Token Format
```bash
curl -X GET "http://localhost:3000/api/verify-email?token=short&email=user@example.com"
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error about token format

#### Test 9.2: Invalid Email Format
```bash
curl -X GET "http://localhost:3000/api/verify-email?token=valid32chartokenhexstringhere&email=invalid-email"
```

**Expected Result:** 
- Status: `400 Bad Request`
- Error: "Invalid email address"

---

## Using Browser DevTools (Easier Method)

### Test XSS Prevention
1. Login via UI
2. Open DevTools → Console
3. Try creating a ticket with XSS payload:

```javascript
fetch('/api/tickets', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    subject: '<script>alert("XSS")</script>Test',
    description: '<img src=x onerror=alert(1)>Test description here',
    category: 'technical',
    priority: 'medium'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

4. Check the response and verify HTML is sanitized

### Test Password Validation
```javascript
// Test weak password
fetch('/api/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'weak'
  })
})
.then(r => r.json())
.then(console.log);
// Should return 400 with password requirements error
```

---

## Quick Verification Checklist

### Validation Tests
- [ ] Signup with weak password returns 400
- [ ] Signup with invalid email returns 400
- [ ] Signup with name too short returns 400
- [ ] Login with invalid email format returns 400
- [ ] Password reset with weak password returns 400
- [ ] Ticket creation with short subject returns 400
- [ ] Ticket creation with short description returns 400
- [ ] Ticket creation with invalid category returns 400
- [ ] Ticket creation with invalid priority returns 400
- [ ] Comment with empty content returns 400
- [ ] Comment too long returns 400
- [ ] 2FA token with wrong format returns 400
- [ ] Invalid ticket ID format returns 400

### Sanitization Tests
- [ ] XSS in ticket subject is sanitized (no HTML tags in DB)
- [ ] XSS in ticket description is sanitized
- [ ] XSS in comment content is sanitized
- [ ] Name with special characters is sanitized
- [ ] Email is converted to lowercase

### Length Limit Tests
- [ ] Description over 10,000 chars returns 400
- [ ] Comment over 5,000 chars returns 400
- [ ] Subject over 200 chars returns 400
- [ ] Name over 100 chars returns 400
- [ ] Password over 128 chars returns 400

---

## Expected Behavior Summary

| Input Type | Validation Rule | Error Message |
|------------|----------------|---------------|
| Email | Must be valid format | "Invalid email address" |
| Password | Min 8 chars, uppercase, lowercase, number, special char | Specific requirement missing |
| Name | Min 2, max 100, alphanumeric + spaces/hyphens/apostrophes | "Name must be at least 2 characters" |
| Subject | Min 3, max 200 | "Subject must be at least 3 characters" |
| Description | Min 10, max 10,000 | "Description must be at least 10 characters" |
| Comment | Min 1, max 5,000 | "Comment cannot be empty" |
| Ticket ID | 32-char hex string | "Invalid ticket ID format" |
| Token | 32-256 char hex string | "Token must be at least 32 characters" |
| 2FA Token | Exactly 6 digits | "2FA token must be 6 digits" |

---

## Security Verification

### XSS Prevention
1. Create ticket/comment with: `<script>alert('XSS')</script>`
2. Check database - HTML tags should be removed
3. View ticket/comment in UI - no script execution

### NoSQL Injection Prevention
1. Try: `email: { "$ne": null }` in login
2. Should be rejected by validation (not a valid email format)

### Input Length DoS Prevention
1. Try sending very long strings (100,000+ chars)
2. Should be rejected before processing

---

## Next Steps After Testing

If all tests pass:
- ✅ Fix #2 is working correctly
- Proceed to Fix #3: Remove/Secure console.log statements

If any tests fail:
- Check server logs for errors
- Verify validation.ts is properly imported
- Review the specific validation schema
- Check DOMPurify is installed and working

---

## Common Issues & Troubleshooting

### Issue: Validation not working
**Solution:** 
- Check that `@/lib/validation` is properly imported
- Verify Zod is installed: `npm list zod`
- Check server logs for import errors

### Issue: XSS still works
**Solution:**
- Verify DOMPurify is installed: `npm list isomorphic-dompurify`
- Check that sanitizeHtml is being called
- Verify sanitization happens before saving to DB

### Issue: Password validation too strict
**Solution:**
- Adjust requirements in `src/lib/validation.ts` passwordSchema
- Consider making some requirements optional for better UX

### Issue: Error messages not user-friendly
**Solution:**
- Customize error messages in validation schemas
- Use getValidationErrorMessage() helper for consistent formatting

