export default function Footer() {
  return (
    <footer className="border-t bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
        
        <span>
          © {new Date().getFullYear()} Research Discuss
        </span>

        <span>
          Built for research collaboration
        </span>
      </div>
    </footer>
  );
}
