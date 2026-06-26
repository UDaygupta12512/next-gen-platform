'use client';

import { useEffect } from 'react';

export default function Loader() {
  useEffect(() => {
    // Auto-remove loader from DOM after animation completes
    const timer = setTimeout(() => {
      const loader = document.getElementById('page-loader');
      if (loader) loader.remove();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="page-loader" aria-hidden="true">
      <div className="loader-ring" />
    </div>
  );
}
