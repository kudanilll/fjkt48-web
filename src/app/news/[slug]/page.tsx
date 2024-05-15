import { getNewsFromStorage } from "@/utils/get-data";
import NormalPageWrapper from "@/components/wrapper/NormalPageWrapper";
import md from "markdown-it";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";

async function getNews(slug: string) {
  try {
    const content: string | null = await getNewsFromStorage(slug);
    if (content !== null) return matter(content);
  } catch (err) {
    console.error(err);
    return null;
  }
}

function NotFound() {
  return (
    <NormalPageWrapper>
      <div className="text-center flex flex-col justify-center items-center content-center space-y-4">
        <Image
          alt="not found :("
          src="/assets/not-found.png"
          width={200}
          height={200}
        />
        <h1 className="hidden md:block text-2xl font-semibold">
          404 - Berita Tidak Ditemukan :(
        </h1>
        <div className="md:hidden">
          <h1 className="text-3xl font-semibold">404</h1>
          <h1 className="text-2xl font-semibold">Berita Tidak Ditemukan :(</h1>
        </div>
        <p>Buka beranda untuk menemukan berita terbaru!</p>
        <div className="px-4 py-2 cursor-pointer bg-red-400 md:bg-transparent md:hover:bg-red-400 rounded-full md:hover:text-white duration-300">
          <Link
            className="text-white md:text-gray-800 md:hover:text-white duration-300"
            href="/">
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </NormalPageWrapper>
  );
}

export default async function DetailNewsPage(props: any) {
  const content = await getNews(props.params.slug);
  if (content == null) {
    return <NotFound />;
  }
  return (
    <div>
      <article>
        <article className="py-8 prose md:prose-lg md:ml-auto md:mr-auto">
          <div
            dangerouslySetInnerHTML={{ __html: md().render(content!.content) }}
          />
        </article>
        <div className="mb-6 flex-col justify-center text-center">
          <div className="font-regular text-sm tracking-wide">
            <span>
              Sumber
              <a
                href={`https://${content!.data.source}`}
                target="_blank"
                className="text-blue-600 hover:underline">
                {" "}
                {content!.data.source}
              </a>
            </span>
          </div>
          <div className="font-regular text-sm tracking-wide">
            Diterbitkan pada {content!.data.date}
          </div>
        </div>
      </article>
    </div>
  );
}
