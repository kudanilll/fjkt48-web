import { getNewsFromStorage } from "@/utils/get-data";
import md from "markdown-it";
import matter from "gray-matter";
import Image from "next/image";

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
    <div className="text-center flex flex-col justify-center items-center content-center space-y-4">
      <Image
        alt="not found :("
        src="/assets/not-found.png"
        width={200}
        height={200}
        className="mt-20 mb-4"
      />
      <h1 className="font-semibold text-center mb-4">
        404: Berita tidak ditemukan :(
      </h1>
      <article className="font-regular text-center">
        Buka beranda untuk menemukan berita terbaru!
      </article>
    </div>
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
