export default function Footer() {
  return (
    <footer className="bg-neutral-900 mt-auto p-2">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col items-center justify-between">
        <span className="text-neutral-400 text-center">
          ©2023
          <a href="https://www.instagram.com/achmaddaniel__?igsh=MXVoN3U5NmZ6MmJsaw==" target="_blank" className="hover:underline"> Achmad Daniel</a>
        </span>
        <ul className="flex flex-row items-center mt-2 text-sm font-medium text-neutral-400 sm:mt-0">
          <li>
            <a href="https://github.com/achmaddaniel24/fjkt48" target="_blank" className="hover:underline">GitHub</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}