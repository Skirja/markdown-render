'use client';

import { useEffect } from 'react';

function ScrollToAnchor() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }, []);

  return null;
}

export default function MarkdownRenderer({ htmlContent }: { htmlContent: string }) {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <ScrollToAnchor />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <article
              className="prose prose-slate max-w-none prose-img:rounded-lg prose-img:shadow-lg prose-img:mx-auto"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </div>

      {/* Floating "Back to Top" button */}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
        >
          ↑ Top
        </button>
      </div>
    </div>
  );
}
