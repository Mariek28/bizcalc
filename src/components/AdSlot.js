'use client';

/**
 * AD SLOT COMPONENT
 * 
 * Shows a placeholder before AdSense approval.
 * After approval, replace the placeholder div with the real AdSense code.
 * 
 * USAGE:
 *   <AdSlot slot="top" />      — above calculator (leaderboard)
 *   <AdSlot slot="results" />  — below results (highest value spot)
 *   <AdSlot slot="sidebar" />  — sidebar on desktop
 *   <AdSlot slot="article" />  — within guide content
 * 
 * AFTER ADSENSE APPROVAL:
 * 1. Uncomment the AdSense script in layout.js
 * 2. Replace the placeholder div below with your ad unit code from AdSense
 * 3. Each slot should use a different ad unit ID
 */

export default function AdSlot({ slot = 'default', className = '' }) {
  const sizes = {
    top: 'min-h-[90px] sm:min-h-[90px]',
    results: 'min-h-[250px]',
    sidebar: 'min-h-[250px]',
    article: 'min-h-[250px]',
  };

  return (
    <div className={`no-print ${className}`}>
      {/* 
        PLACEHOLDER — Replace this entire div with your AdSense ad unit after approval.
        Example:
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXX"
          data-ad-slot="YYYYYYY"
          data-ad-format="auto"
          data-full-width-responsive="true" />
      */}
      <div className={`ad-slot ${sizes[slot] || sizes.top}`}>
        <span>Ad Space — {slot}</span>
      </div>
    </div>
  );
}
