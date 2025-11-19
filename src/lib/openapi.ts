// OpenAPI specification for the application's API routes
// Minimal but comprehensive coverage of endpoints, params, and responses

export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'McCoin API',
    version: '1.0.0',
    description:
      'API documentation for McCoin public and internal endpoints. Import this spec into Postman to generate a collection.',
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local' },
    { url: 'https://mc-coin-new-website-hassanjarkoyahoocoms-projects.vercel.app', description: 'Production' },
  ],
  tags: [
    { name: 'Auth' },
    { name: '2FA' },
    { name: 'Users' },
    { name: 'Blog' },
    { name: 'Markets' },
    { name: 'Podcasts' },
    { name: 'Tickets' },
    { name: 'Utils' },
  ],
  paths: {
    '/api/check-user-status': {
      post: {
        tags: ['Auth'],
        summary: 'Check user status before login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', format: 'password' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User verified and ready to login',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginCheckOK' } } },
          },
          '401': { description: 'Invalid credentials' },
          '403': { description: 'Email not verified' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/api/signup': {
      post: {
        tags: ['Auth'],
        summary: 'Create user account',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  password: { type: 'string', format: 'password', minLength: 8 },
                  recaptchaToken: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Account created (verification required)' },
          '409': { description: 'Email already exists' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/api/verify-email': {
      get: {
        tags: ['Auth'],
        summary: 'Verify email via token',
        parameters: [
          { in: 'query', name: 'token', schema: { type: 'string' }, required: true },
          { in: 'query', name: 'email', schema: { type: 'string', format: 'email' }, required: true },
        ],
        responses: { '200': { description: 'Verified or already verified' }, '400': { description: 'Invalid' } },
      },
      post: {
        tags: ['Auth'],
        summary: 'Resend verification email',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string', format: 'email' } }, required: ['email'] } } },
        },
        responses: { '200': { description: 'Verification email sent' }, '404': { description: 'User not found' } },
      },
    },
    '/api/verify': {
      get: {
        tags: ['Auth'],
        summary: 'Verify email (legacy)',
        parameters: [{ in: 'query', name: 'token', required: true, schema: { type: 'string' } }],
        responses: { '302': { description: 'Redirect to login with verified=true' }, '400': { description: 'Invalid' } },
      },
    },
    '/api/forgot-password': {
      post: {
        tags: ['Auth'],
        summary: 'Request password reset',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string', format: 'email' } }, required: ['email'] } } } },
        responses: { '200': { description: 'Email sent (or noop)' }, '500': { description: 'Failed to send' } },
      },
    },
    '/api/verify-reset-token': {
      post: {
        tags: ['Auth'],
        summary: 'Verify reset token validity',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { token: { type: 'string' }, email: { type: 'string', format: 'email' } }, required: ['token', 'email'] } } } },
        responses: { '200': { description: 'Valid' }, '400': { description: 'Invalid/used/expired' } },
      },
    },
    '/api/reset-password': {
      post: {
        tags: ['Auth'],
        summary: 'Reset password with token',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: { type: 'string' },
                  email: { type: 'string', format: 'email' },
                  newPassword: { type: 'string', minLength: 8 },
                },
                required: ['token', 'email', 'newPassword'],
              },
            },
          },
        },
        responses: { '200': { description: 'Password reset successfully' }, '400': { description: 'Invalid' } },
      },
    },
    '/api/2fa/setup': {
      post: {
        tags: ['2FA'],
        summary: 'Generate 2FA secret and QR (requires session)',
        responses: { '200': { description: 'Returns secret and QR code' }, '401': { description: 'Unauthorized' } },
      },
    },
    '/api/2fa/verify': {
      post: {
        tags: ['2FA'],
        summary: 'Verify 2FA token and enable',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { token: { type: 'string' } }, required: ['token'] } } } },
        responses: { '200': { description: '2FA enabled' }, '400': { description: 'Invalid token' }, '401': { description: 'Unauthorized' } },
      },
    },
    '/api/2fa/status': {
      get: {
        tags: ['2FA'],
        summary: 'Get 2FA status (requires session)',
        responses: { '200': { description: '2FA flags' }, '401': { description: 'Unauthorized' } },
      },
    },
    '/api/2fa/disable': {
      post: {
        tags: ['2FA'],
        summary: 'Disable 2FA after verifying token',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { token: { type: 'string' } }, required: ['token'] } } } },
        responses: { '200': { description: '2FA disabled' }, '400': { description: 'Invalid token' }, '401': { description: 'Unauthorized' } },
      },
    },
    '/api/2fa/verify-login': {
      post: {
        tags: ['2FA'],
        summary: 'Verify login with 2FA',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string', format: 'email' }, password: { type: 'string' }, token: { type: 'string' } }, required: ['email', 'password', 'token'] } } },
        },
        responses: { '200': { description: 'Login successful' }, '401': { description: 'Invalid' }, '403': { description: 'Email not verified' } },
      },
    },
    '/api/blog-posts': {
      get: {
        tags: ['Blog'],
        summary: 'Get blog posts',
        responses: { '200': { description: 'OK' } },
      },
      options: {
        tags: ['Blog'],
        summary: 'CORS preflight',
        responses: { '200': { description: 'OK' } },
      },
    },
    '/api/blog-posts/{slug}': {
      get: {
        tags: ['Blog'],
        summary: 'Get a blog post',
        parameters: [{ in: 'path', name: 'slug', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } },
      },
      options: {
        tags: ['Blog'],
        summary: 'CORS preflight',
        responses: { '200': { description: 'OK' } },
      },
    },
    '/api/crypto-data': {
      get: {
        tags: ['Markets'],
        summary: 'Get detailed crypto data (CoinGecko)',
        parameters: [
          { in: 'query', name: 'symbol', schema: { type: 'string' }, description: 'e.g., BTC' },
          { in: 'query', name: 'orderBook', schema: { type: 'string', enum: ['true', 'false'] } },
        ],
        responses: { '200': { description: 'OK' } },
      },
    },
    '/api/exchange-rates': {
      get: { tags: ['Markets'], summary: 'Get exchange rates snapshot', responses: { '200': { description: 'OK' } } },
    },
    '/api/markets': {
      get: { tags: ['Markets'], summary: 'Get markets overview and executions', responses: { '200': { description: 'OK' } } },
    },
    '/api/prices_table': {
      get: { tags: ['Markets'], summary: 'Get prices table (top 50)', responses: { '200': { description: 'OK' } } },
    },
    '/api/podcasts/series/{seriesId}': {
      get: {
        tags: ['Podcasts'],
        summary: 'Get podcast series episodes',
        parameters: [{ in: 'path', name: 'seriesId', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' }, '404': { description: 'Series not found' } },
      },
    },
    '/api/tickets': {
      get: {
        tags: ['Tickets'],
        summary: "List user's tickets and stats",
        parameters: [{ in: 'query', name: 'userId', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' }, '404': { description: 'User not found' } },
      },
      post: {
        tags: ['Tickets'],
        summary: 'Create a ticket',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['userId', 'subject', 'description', 'category', 'priority'],
                properties: {
                  userId: { type: 'string' },
                  subject: { type: 'string' },
                  description: { type: 'string' },
                  category: { type: 'string' },
                  priority: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
                  environment: { type: 'string' },
                  pageUrl: { type: 'string', format: 'uri' },
                  attachments: { type: 'array', items: { type: 'string', format: 'binary' } },
                },
              },
            },
          },
        },
        responses: { '200': { description: 'Ticket created' }, '404': { description: 'User not found' } },
      },
    },
    '/api/tickets/{id}': {
      get: {
        tags: ['Tickets'],
        summary: 'Get a ticket by id',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } },
      },
      patch: {
        tags: ['Tickets'],
        summary: 'Update a ticket by id',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
        responses: { '200': { description: 'Updated' }, '404': { description: 'Not found' } },
      },
      delete: {
        tags: ['Tickets'],
        summary: 'Delete a ticket by id',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } },
      },
    },
    '/api/tickets/{id}/comments': {
      get: {
        tags: ['Tickets'],
        summary: 'List comments for a ticket',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: { '200': { description: 'OK' }, '404': { description: 'Not found' } },
      },
      post: {
        tags: ['Tickets'],
        summary: 'Add a comment to a ticket',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { type: 'object', properties: { content: { type: 'string' }, isInternal: { type: 'boolean' } }, required: ['content'] } } },
        },
        responses: { '200': { description: 'Comment added' }, '404': { description: 'Not found' } },
      },
    },
    '/api/test-email': {
      post: {
        tags: ['Utils'],
        summary: 'Send a test verification email',
        requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', properties: { email: { type: 'string', format: 'email' } }, required: ['email'] } } } },
        responses: { '200': { description: 'Sent' }, '500': { description: 'Failed' } },
      },
    },
    '/api/health-check': {
      get: { tags: ['Utils'], summary: 'Health check', responses: { '200': { description: 'OK' } } },
    },
    '/api/test-session': {
      get: { tags: ['Utils'], summary: 'Test NextAuth session', responses: { '200': { description: 'OK' } } },
    },
  },
  components: {
    schemas: {
      LoginCheckOK: {
        type: 'object',
        properties: {
          success: { type: 'boolean' },
          message: { type: 'string' },
          needs2FA: { type: 'boolean' },
        },
      },
    },
  },
};

export default openApiSpec;


