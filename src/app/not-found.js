export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className="container-main py-24 text-center">
      <h1 className="text-6xl font-heading font-bold text-slate-300 mb-4">404</h1>
      <p className="text-lg text-slate-600 mb-6">This page doesn&apos;t exist or has been moved.</p>
      <a
        href="/"
        className="inline-flex items-center gap-2 bg-brand-600 text-white font-heading font-bold px-6 py-3 rounded-lg hover:bg-brand-700 transition-colors"
      >
        Back to Home
      </a>
    </div>
  );
}
