export default function Footer() {
  return (
    <footer className="bg-zinc-900 mt-auto p-2">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col items-center justify-between">
        <span className="text-neutral-300 text-center">
          ©2023
          <a href={process.env.AUTHOR_INSTAGRAM_URL} target="_blank" className="hover:underline"> Achmad Daniel</a>
        </span>
        <ul className="flex flex-row items-center mt-2 text-sm font-medium text-neutral-300 sm:mt-0">
          <li>
            <a href={process.env.AUTHOR_GITHUB_URL} target="_blank" className="hover:underline px-2">GitHub</a>
            <a href={process.env.AUTHOR_SUPPORT_URL} target="_blank" className="hover:underline px-2">Support</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}