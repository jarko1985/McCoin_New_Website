// Test script to demonstrate the content formatting function
const { formatBlogContent } = require('./src/lib/blog-api.ts');

// Sample content with various formatting
const sampleContent = `
<h2>Understanding What You're Protecting</h2>
<p>Unlike traditional financial assets, cryptocurrencies exist entirely in digital form. Ownership is determined by a private key; a long, cryptographically generated string that grants full control over your assets.</p>

<h3>The Common Threats Facing New Investors</h3>
<p>Many beginners assume that crypto theft happens only through sophisticated hacking, but the majority of losses occur through human error and manipulation. The most common threats include:</p>

<ul>
<li><strong>Phishing Attacks:</strong> Fraudulent websites or emails that mimic trusted exchanges or wallet providers to trick users into revealing their private keys or login credentials.</li>
<li><strong>Malware and Keyloggers:</strong> Malicious software installed on devices that capture keystrokes, steal wallet files, or redirect transactions.</li>
<li><strong>Fake Wallets or Exchanges:</strong> Imitation platforms designed to collect deposits without ever allowing withdrawals.</li>
</ul>

<p>Understanding these risks is the first step in building an effective defence.</p>

<h3>Building a Personal Security Framework</h3>
<p>A secure investor treats their crypto portfolio as a digital vault; one that requires multiple layers of protection. Below are the key components every new trader in the MENA region should implement before transacting:</p>

<ol>
<li>Use Reputable Platforms Only</li>
<li>Enable Two-Factor Authentication (2FA)</li>
<li>Separate Hot and Cold Wallets</li>
<li>Back Up Your Recovery Phrases Securely</li>
</ol>

<blockquote>
Security in crypto isn't just about personal habits — it's also about choosing partners who operate transparently and under proper regulation.
</blockquote>

<p>For more information, visit <a href="https://example.com">our security guide</a>.</p>
`;

console.log('Original content:');
console.log(sampleContent);
console.log('\n' + '='.repeat(50) + '\n');
console.log('Formatted content:');
console.log(formatBlogContent(sampleContent));
