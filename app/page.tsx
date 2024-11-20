'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [githubUrl, setGithubUrl] = useState('');
  const [rawUrl, setRawUrl] = useState('');
  const router = useRouter();

  const convertToRawUrl = (url: string) => {
    // Convert github.com URL to raw.githubusercontent.com
    const githubRegex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/blob\/([^\/]+)\/(.+)/;
    const match = url.match(githubRegex);
    
    if (match) {
      const [, owner, repo, branch, path] = match;
      const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
      return rawUrl;
    }
    return 'Invalid GitHub URL format';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const converted = convertToRawUrl(githubUrl);
    setRawUrl(converted);
  };

  const handleViewRendered = () => {
    if (rawUrl && !rawUrl.includes('Invalid')) {
      router.push(`/render?url=${encodeURIComponent(rawUrl)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            GitHub Markdown URL Converter
          </h1>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="github-url" className="block text-sm font-medium text-gray-700">
                GitHub Markdown URL
              </label>
              <input
                type="url"
                id="github-url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/user/repo/blob/main/README.md"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border text-gray-900"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Convert to Raw URL
            </button>
          </form>

          {rawUrl && (
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Raw URL:
              </label>
              <div className="bg-gray-50 p-3 rounded-md break-all">
                <a
                  href={rawUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  {rawUrl}
                </a>
              </div>
              {!rawUrl.includes('Invalid') && (
                <button
                  onClick={handleViewRendered}
                  className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  View Rendered Markdown
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
