import { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Test Metadata Page | McCoin',
  description: 'This is a test page to verify social media preview images are working correctly.',
  url: '/en/test-metadata',
});

export default function TestMetadataPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#07153B] to-[#1A0A2E] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Test Metadata Page</h1>
        <p className="text-xl mb-8">
          This page is designed to test social media preview images. When you share this URL on
          social media platforms like Facebook, Twitter, or LinkedIn, you should see a proper
          preview with the McCoin branding.
        </p>

        <div className="bg-white/10 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">What to Test:</h2>
          <ul className="space-y-2 text-lg">
            <li>• Share this URL on Facebook</li>
            <li>• Share this URL on Twitter/X</li>
            <li>• Share this URL on LinkedIn</li>
            <li>• Share this URL on WhatsApp</li>
            <li>• Share this URL on Telegram</li>
          </ul>
        </div>

        <div className="bg-white/10 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Expected Result:</h2>
          <p className="text-lg">You should see a preview card with:</p>
          <ul className="space-y-2 text-lg mt-2">
            <li>• Title: "Test Metadata Page | McCoin"</li>
            <li>
              • Description: "This is a test page to verify social media preview images are working
              correctly."
            </li>
            <li>• Image: The McCoin branded social media preview image</li>
            <li>• URL: Your website domain</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/en"
            className="inline-block bg-[#EC3B3B] hover:bg-[#FF6B6B] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
