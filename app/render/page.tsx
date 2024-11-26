'use client';

import { useState, useEffect } from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import MarkdownRenderer from './markdown-renderer';

async function fetchMarkdown(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch markdown content');
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching markdown:', error);
    return 'Error loading markdown content';
  }
}

function convertImageUrls(markdown: string, baseUrl: string) {
  // Convert relative image paths to absolute GitHub raw URLs
  return markdown.replace(
    /!\[(.*?)\]\((\.\/.*?)\)/g,
    (match, alt, relativePath) => {
      const absolutePath = relativePath.replace('./', '');
      const rawUrl = baseUrl.replace('/blob/', '/').replace('github.com', 'raw.githubusercontent.com');
      const imageUrl = rawUrl.substring(0, rawUrl.lastIndexOf('/')) + '/' + absolutePath;
      return `![${alt}](${imageUrl})`;
    }
  );
}

function getBaseUrl(rawUrl: string): string {
  // Convert raw.githubusercontent.com URL back to github.com URL for base path
  return rawUrl
    .replace('raw.githubusercontent.com', 'github.com')
    .replace(/\/[^\/]+$/, '/blob/');
}

async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkHtml, {
      sanitize: false, // Allow data-* attributes
    })
    .process(markdown);

  return result.toString();
}

export default function RenderPage() {
  const [url, setUrl] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get URL from query parameters on component mount
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url');
    if (urlParam) {
      setUrl(urlParam);
    }
  }, []);

  useEffect(() => {
    async function loadContent() {
      if (!url) return;

      setLoading(true);
      setError(null);

      try {
        const markdown = await fetchMarkdown(url);
        const baseUrl = getBaseUrl(url);
        const markdownWithAbsoluteUrls = convertImageUrls(markdown, baseUrl);
        let content = await markdownToHtml(markdownWithAbsoluteUrls);

        // Add id attributes to headings for anchor links
        content = content.replace(
          /<h([1-6])>([^<]+)<\/h[1-6]>/g,
          (match, level, text) => {
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
            return `<h${level} id="${id}">${text}</h${level}>`;
          }
        );

        setHtmlContent(content);
      } catch {
        setError('Failed to load or render markdown content');
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [url]);

  if (!url) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  No URL provided. Please provide a raw GitHub URL to render.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <MarkdownRenderer htmlContent={htmlContent} />;
}
