# Migration Guide: Mongoose (MongoDB) → Prisma (Aurora MySQL)

## Overview

This guide outlines the steps to migrate your McCoin application from:
- **Current**: Mongoose ODM with MongoDB
- **Target**: Prisma ORM with Aurora MySQL (MySQL-compatible)

---

## Current State Analysis

### Current Database Models
Based on codebase analysis, you currently have:

1. **User Model** (`src/lib/models/User.ts`)
   - Basic user fields (name, email, password, etc.)
   - Email verification tokens
   - Password reset tokens
   - 2FA settings (twoFactorEnabled, twoFactorSecret)
   - Embedded Tickets array

2. **Ticket Sub-schemas** (embedded in User)
   - TicketAttachmentSchema
   - TicketCommentSchema
   - TicketTimelineEventSchema
   - TicketSchema (with nested comments, attachments, timeline)

### Current Mongoose Usage
- **99 instances** of Mongoose usage across the codebase
- Connection management via `src/lib/mongoose.ts`
- Direct model queries: `User.findOne()`, `User.create()`, `User.findByIdAndUpdate()`
- Embedded documents (tickets within users)

---

## Migration Steps

### Phase 1: Planning & Setup (No Code Changes)

#### Step 1.1: Database Provider Setup

**✅ You've chosen: Aiven.io (MySQL)**

**Aiven.io Free Tier:**
- **Free Credits**: $300 credit for new accounts
- **MySQL Service**: Standard MySQL 8.0
- **Storage**: Varies by plan (free tier typically includes basic storage)
- **Pros**:
  - Generous free credits for new users
  - Managed MySQL service
  - Good documentation
  - SSL/TLS support included
  - Works well with Prisma
- **Cons**:
  - Credits expire after a period (check current terms)
  - Not true Aurora (but standard MySQL works perfectly)
- **Best For**: Development, testing, and small production apps
- **Website**: https://aiven.io

**Getting Your Connection String from Aiven.io:**

1. Log into your Aiven.io dashboard
2. Select your MySQL service
3. Go to the **Overview** tab
4. Find the **Connection information** section
5. Copy the **Connection string** (it will look like):
   ```
   mysql://avnadmin:password@hostname:port/database?ssl-mode=REQUIRED
   ```
6. Or use the individual connection parameters:
   - **Host**: `your-service.a.aivencloud.com`
   - **Port**: `12345` (typically)
   - **Database**: `defaultdb` (or your custom database name)
   - **User**: `avnadmin` (default)
   - **Password**: (shown in dashboard)
   - **SSL**: Required

**Alternative Options (if needed later):**

1. **AWS RDS Aurora Serverless v2 (MySQL-Compatible)**
   - **Free Tier**: 750 hours/month for 12 months
   - **Best For**: Production applications
   - **Cost**: ~$0.10/hour after free tier

2. **Railway (MySQL)**
   - **Free Tier**: $5 credit/month
   - **Best For**: Development/testing

3. **Supabase (PostgreSQL)**
   - **Free Tier**: 500MB database
   - **Note**: PostgreSQL, not MySQL, but Prisma supports it

---

#### Step 1.2: Database Schema Design

**Key Differences: MongoDB → MySQL**

1. **Embedded Documents → Separate Tables**
   - MongoDB: Tickets embedded in User document
   - MySQL: Separate `users` and `tickets` tables with foreign keys

2. **Schema Structure**
   ```
   MongoDB (Current):
   User {
     _id: ObjectId
     email: String
     tickets: [Ticket]  // Embedded
   }
   
   MySQL (Target):
   users table
   tickets table (with userId foreign key)
   ticket_comments table (with ticketId foreign key)
   ticket_attachments table (with ticketId foreign key)
   ticket_timeline_events table (with ticketId foreign key)
   ```

3. **Data Type Mappings**
   - MongoDB `ObjectId` → MySQL `VARCHAR(36)` or `BINARY(16)` (UUID)
   - MongoDB `Date` → MySQL `DATETIME` or `TIMESTAMP`
   - MongoDB `Mixed` → MySQL `JSON` type
   - MongoDB `Boolean` → MySQL `BOOLEAN` or `TINYINT(1)`

---

### Phase 2: Prisma Setup

#### Step 2.1: Install Prisma

```bash
npm install prisma @prisma/client
npm install -D prisma
```

#### Step 2.2: Initialize Prisma

```bash
npx prisma init
```

This creates:
- `prisma/schema.prisma` - Your database schema
- `.env` - Database connection string

#### Step 2.3: Configure Prisma Schema

**Example `prisma/schema.prisma` structure:**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id                    String    @id @default(uuid())
  name                  String?
  email                 String    @unique
  password              String?
  emailVerified         DateTime? @map("email_verified")
  image                 String?
  verifyToken           String?   @map("verify_token")
  verifyTokenExpires    DateTime? @map("verify_token_expires")
  isVerified            Boolean   @default(false) @map("is_verified")
  twoFactorEnabled      Boolean   @default(false) @map("two_factor_enabled")
  twoFactorSecret       String?   @default("") @map("two_factor_secret")
  resetPasswordToken    String?   @map("reset_password_token")
  resetPasswordExpires  DateTime? @map("reset_password_expires")
  resetPasswordTokenUsed Boolean @default(false) @map("reset_password_token_used")
  createdAt             DateTime  @default(now()) @map("created_at")
  updatedAt             DateTime  @updatedAt @map("updated_at")
  
  tickets               Ticket[]
  
  @@map("users")
}

model Ticket {
  id              String    @id @default(uuid())
  ticketNumber    String    @unique @map("ticket_number")
  subject         String
  description     String    @db.Text
  category        TicketCategory
  priority        TicketPriority @default(MEDIUM)
  status          TicketStatus @default(OPEN)
  userId          String    @map("user_id")
  assigneeId      String?   @map("assignee_id")
  environment     String?
  pageUrl         String?   @map("page_url")
  slaTarget       DateTime? @map("sla_target")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")
  lastActivityAt  DateTime  @default(now()) @map("last_activity_at")
  
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  comments        TicketComment[]
  attachments     TicketAttachment[]
  timeline        TicketTimelineEvent[]
  
  @@map("tickets")
}

model TicketComment {
  id          String    @id @default(uuid())
  ticketId    String    @map("ticket_id")
  content     String    @db.Text
  authorId    String    @map("author_id")
  authorName  String    @map("author_name")
  authorEmail String    @map("author_email")
  authorType  AuthorType @default(USER) @map("author_type")
  isInternal  Boolean   @default(false) @map("is_internal")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime? @updatedAt @map("updated_at")
  
  ticket      Ticket    @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  attachments TicketAttachment[]
  
  @@map("ticket_comments")
}

model TicketAttachment {
  id          String    @id @default(uuid())
  ticketId    String?   @map("ticket_id")
  commentId   String?   @map("comment_id")
  filename    String
  originalName String   @map("original_name")
  mimeType    String    @map("mime_type")
  size        Int
  url         String
  uploadedAt  DateTime  @default(now()) @map("uploaded_at")
  
  ticket      Ticket?   @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  comment     TicketComment? @relation(fields: [commentId], references: [id], onDelete: Cascade)
  
  @@map("ticket_attachments")
}

model TicketTimelineEvent {
  id          String    @id @default(uuid())
  ticketId    String    @map("ticket_id")
  type        TimelineEventType
  description String
  actorId     String    @map("actor_id")
  actorName   String    @map("actor_name")
  actorType   AuthorType @default(USER) @map("actor_type")
  metadata    Json?
  createdAt   DateTime  @default(now()) @map("created_at")
  
  ticket      Ticket    @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  
  @@map("ticket_timeline_events")
}

enum TicketCategory {
  TECHNICAL
  BILLING
  ACCOUNT
  GENERAL
  FEATURE_REQUEST
  BUG_REPORT
}

enum TicketPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum TicketStatus {
  OPEN
  IN_PROGRESS
  AWAITING_USER
  RESOLVED
  CLOSED
}

enum AuthorType {
  USER
  SYSTEM
  AGENT
}

enum TimelineEventType {
  CREATED
  STATUS_CHANGED
  ASSIGNED
  COMMENT_ADDED
  ATTACHMENT_ADDED
  RESOLVED
  CLOSED
}
```

---

### Phase 3: Database Migration

#### Step 3.1: Configure Database Connection

**For Aiven.io:**

1. **Get Connection String from Aiven Dashboard:**
   - Go to your MySQL service → Overview → Connection information
   - Copy the connection string

2. **Format the Connection String for Prisma:**
   ```
   mysql://avnadmin:your-password@your-service.a.aivencloud.com:12345/defaultdb?ssl-mode=REQUIRED
   ```

3. **Update `.env` file:**
   ```bash
   # Remove old MongoDB connection
   # MONGODB_URI=...
   
   # Add Aiven MySQL connection
   DATABASE_URL="mysql://avnadmin:your-password@your-service.a.aivencloud.com:12345/defaultdb?ssl-mode=REQUIRED"
   ```

4. **Important Notes for Aiven.io:**
   - **SSL is required** - Always include `?ssl-mode=REQUIRED` in connection string
   - **Connection Pooling**: Aiven supports connection pooling, Prisma handles this automatically
   - **Database Name**: Default is usually `defaultdb`, but you can create a custom database
   - **Port**: Check your Aiven dashboard for the correct port (not always 3306)

**Alternative Providers:**

**For AWS Aurora:**
```bash
# Format: mysql://username:password@aurora-endpoint:3306/database
DATABASE_URL="mysql://admin:password@your-cluster.cluster-xxxxx.us-east-1.rds.amazonaws.com:3306/mccoin"
```

**For Railway:**
```bash
# Format provided in Railway dashboard
DATABASE_URL="mysql://user:password@host:port/database"
```

#### Step 3.2: Run Prisma Migrate

```bash
# Create initial migration
npx prisma migrate dev --name init

# This will:
# 1. Create migration files in prisma/migrations/
# 2. Apply migration to database
# 3. Generate Prisma Client
```

#### Step 3.3: Generate Prisma Client

```bash
npx prisma generate
```

---

### Phase 4: Code Migration

#### Step 4.1: Create Prisma Client Singleton

**Create `src/lib/prisma.ts`:**
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

#### Step 4.2: Replace Mongoose Queries

**Before (Mongoose):**
```typescript
const user = await User.findOne({ email: email.toLowerCase() });
await User.create({ name, email, password });
await User.findByIdAndUpdate(user._id, { isVerified: true });
```

**After (Prisma):**
```typescript
const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
await prisma.user.create({ data: { name, email, password } });
await prisma.user.update({ where: { id: user.id }, data: { isVerified: true } });
```

#### Step 4.3: Update All API Routes

**Files to update (99 instances):**
- `src/app/api/check-user-status/route.ts`
- `src/app/api/signup/route.ts`
- `src/app/api/forgot-password/route.ts`
- `src/app/api/reset-password/route.ts`
- `src/app/api/verify-email/route.ts`
- `src/app/api/2fa/**/*.ts`
- `src/app/api/tickets/**/*.ts`
- `src/lib/security.ts`
- All other files using `User.findOne()`, `User.create()`, etc.

#### Step 4.4: Handle Embedded Documents

**Before (Mongoose - Embedded):**
```typescript
await User.findByIdAndUpdate(userId, {
  $push: { tickets: newTicket }
});
```

**After (Prisma - Separate Table):**
```typescript
await prisma.ticket.create({
  data: {
    ...ticketData,
    userId: userId
  }
});
```

---

### Phase 5: Data Migration

#### Step 5.1: Export MongoDB Data

```bash
# Export users collection
mongoexport --uri="mongodb://..." --collection=users --out=users.json

# Or use MongoDB Compass export feature
```

#### Step 5.2: Transform Data Format

Create a migration script to:
1. Read MongoDB JSON export
2. Transform embedded tickets to separate records
3. Generate UUIDs for IDs (instead of ObjectId)
4. Map data types correctly

#### Step 5.3: Import to MySQL

```typescript
// migration-script.ts
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function migrate() {
  const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
  
  for (const user of users) {
    // Create user
    const newUser = await prisma.user.create({
      data: {
        id: generateUUID(), // Convert ObjectId to UUID
        email: user.email,
        name: user.name,
        // ... other fields
      }
    });
    
    // Create tickets separately
    if (user.tickets && user.tickets.length > 0) {
      for (const ticket of user.tickets) {
        await prisma.ticket.create({
          data: {
            id: generateUUID(),
            userId: newUser.id,
            // ... ticket fields
          }
        });
        
        // Create comments, attachments, timeline events
        // ...
      }
    }
  }
}
```

---

### Phase 6: Testing & Validation

#### Step 6.1: Unit Tests
- Test all API endpoints
- Verify data integrity
- Check foreign key constraints

#### Step 6.2: Integration Tests
- Test complete user flows
- Test ticket creation/updates
- Test 2FA flows

#### Step 6.3: Performance Testing
- Compare query performance
- Check connection pooling
- Monitor database load

---

### Phase 7: Deployment

#### Step 7.1: Environment Variables

Update `.env`:
```bash
# Remove
MONGODB_URI=...

# Add Aiven.io MySQL connection
DATABASE_URL="mysql://avnadmin:your-password@your-service.a.aivencloud.com:12345/defaultdb?ssl-mode=REQUIRED"
```

#### Step 7.2: Update Vercel Environment Variables

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Remove `MONGODB_URI`
3. Add `DATABASE_URL` with your Aiven.io connection string:
   ```
   mysql://avnadmin:your-password@your-service.a.aivencloud.com:12345/defaultdb?ssl-mode=REQUIRED
   ```
4. **Important**: Make sure to include `?ssl-mode=REQUIRED` for Aiven.io

#### Step 7.3: Update Build Scripts

```json
{
  "scripts": {
    "postinstall": "prisma generate",
    "db:migrate": "prisma migrate deploy",
    "db:studio": "prisma studio"
  }
}
```

---

## Migration Checklist

### Pre-Migration
- [x] Choose database provider (Aiven.io - ✅ Already created)
- [x] Create database instance (✅ Done)
- [ ] Get connection string from Aiven.io dashboard
- [ ] Test connection string locally
- [ ] Backup MongoDB data
- [ ] Document all Mongoose queries

### Setup
- [ ] Install Prisma
- [ ] Initialize Prisma
- [ ] Design Prisma schema
- [ ] Create migration files
- [ ] Generate Prisma Client

### Code Migration
- [ ] Create Prisma client singleton
- [ ] Replace all `User.findOne()` calls
- [ ] Replace all `User.create()` calls
- [ ] Replace all `User.findByIdAndUpdate()` calls
- [ ] Update ticket operations (embedded → separate table)
- [ ] Update all API routes (99 files)
- [ ] Remove Mongoose imports
- [ ] Remove `src/lib/mongoose.ts`
- [ ] Remove `src/lib/models/User.ts`

### Data Migration
- [ ] Export MongoDB data
- [ ] Create data transformation script
- [ ] Import data to MySQL
- [ ] Verify data integrity
- [ ] Check record counts match

### Testing
- [ ] Test user registration
- [ ] Test user login
- [ ] Test email verification
- [ ] Test password reset
- [ ] Test 2FA setup/verification
- [ ] Test ticket creation
- [ ] Test ticket updates
- [ ] Test ticket comments
- [ ] Test all API endpoints

### Deployment
- [ ] Update environment variables
- [ ] Update Vercel config
- [ ] Run migrations in production
- [ ] Monitor for errors
- [ ] Keep MongoDB as backup (for rollback)

### Post-Migration
- [ ] Monitor performance
- [ ] Check error logs
- [ ] Verify all features work
- [ ] Remove MongoDB dependencies from package.json
- [ ] Archive MongoDB data

---

## Key Considerations

### 1. **ID Generation**
- MongoDB uses `ObjectId` (24 char hex)
- MySQL will use UUIDs (36 char)
- Need to update all ID references

### 2. **Transactions**
- Prisma supports transactions
- Use for operations that need atomicity

### 3. **Connection Pooling**
- Prisma handles connection pooling automatically
- Configure in `DATABASE_URL` or Prisma config

### 4. **Nested Queries**
- Prisma supports nested queries with `include` or `select`
- More explicit than Mongoose

### 5. **Migrations**
- Prisma migrations are version-controlled
- Can rollback if needed
- Test migrations in staging first

---

## Estimated Timeline

- **Planning & Setup**: 1-2 days
- **Prisma Schema Design**: 1 day
- **Code Migration**: 3-5 days (99 files)
- **Data Migration**: 1-2 days
- **Testing**: 2-3 days
- **Deployment**: 1 day

**Total**: ~10-14 days for complete migration

---

## Rollback Plan

1. Keep MongoDB running during migration
2. Deploy new code with feature flag
3. Monitor for issues
4. If critical issues, revert to MongoDB
5. Keep both databases in sync during transition period

---

## Resources

- **Prisma Docs**: https://www.prisma.io/docs
- **Aiven.io Docs**: https://docs.aiven.io/docs/products/mysql
- **Aiven.io MySQL Connection Guide**: https://docs.aiven.io/docs/products/mysql/howto/connect-with-mysql-command-line-client
- **AWS Aurora Docs**: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide
- **Prisma Migrate Guide**: https://www.prisma.io/docs/guides/migrate

---

## Next Steps

1. ✅ **Database provider chosen** (Aiven.io - already set up)
2. ✅ **Database instance created** (Done)
3. **Get your Aiven.io connection string** from the dashboard
4. **Test the connection** locally
5. **Design the Prisma schema** based on this guide
6. **Create a migration branch** in Git
7. **Start with one API route** as a proof of concept
8. **Gradually migrate other routes**

---

## Aiven.io Specific Setup Instructions

### Getting Your Connection Details

1. **Log into Aiven.io Dashboard**: https://console.aiven.io
2. **Select your MySQL service** from the services list
3. **Go to Overview tab**
4. **Find "Connection information" section**
5. **You'll see:**
   - **Host**: `your-service.a.aivencloud.com`
   - **Port**: `12345` (example)
   - **Database name**: `defaultdb` (or custom)
   - **User**: `avnadmin`
   - **Password**: (click to reveal)
   - **SSL mode**: `REQUIRED`

### Creating Connection String

**Format:**
```
mysql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]?ssl-mode=REQUIRED
```

**Example:**
```
mysql://avnadmin:abc123xyz@mccoin-mysql.a.aivencloud.com:12345/defaultdb?ssl-mode=REQUIRED
```

### Testing Connection

You can test the connection using:
```bash
# Using MySQL client
mysql -h your-service.a.aivencloud.com -P 12345 -u avnadmin -p defaultdb

# Or using Prisma Studio (after setup)
npx prisma studio
```

### Important Aiven.io Notes

- ✅ **SSL is mandatory** - Always include `?ssl-mode=REQUIRED`
- ✅ **Connection limits** - Check your plan's connection limit
- ✅ **Backups** - Aiven provides automated backups (check your plan)
- ✅ **Monitoring** - Use Aiven dashboard to monitor usage
- ⚠️ **Free credits** - Monitor your credit usage in the dashboard

---

**Note**: This is a planning document. No code changes have been made yet. When you're ready to start, we can begin with Phase 2 (Prisma Setup).

