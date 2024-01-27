import { getNewsFromStorage } from "@/utils/get-data";
import Image from "next/image";
import md from "markdown-it";
import matter from "gray-matter";

async function getNews(slug: string) {
  try {
    const content = await getNewsFromStorage(slug);
    return matter(content);
  } catch (err) {
    return null;
  }
}

export default async function DetailNewsPage(props: any) {
  const content = await getNews(props.params.slug);
  if (content == null) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="font-semibold text-center mb-4">
          404: Berita tidak ditemukan :(
        </h1>
        <article className="font-regular text-center">
          Buka beranda untuk menemukan berita terbaru!
        </article>
      </div>
    );
  }
  return (
    <div>
      <div className="mb-6">
        <Image
          className="w-full object-cover rounded-xl"
          width={500}
          height={500}
          alt={content.data.title}
          src={content.data.image}
          priority={true}
        />
      </div>
      <article>
        <div className="mb-6 flex-col justify-center text-center">
          <div className="font-regular text-sm md:text-lg tracking-wide">
            <span>
              Sumber
              <a
                href={`https://${content!.data.source}`}
                target="_blank"
                className="hover:underline">
                {" "}
                {content!.data.source}
              </a>
            </span>
          </div>
          <div className="font-regular text-sm md:text-lg tracking-wide">
            Diterbitkan pada {content!.data.date}
          </div>
        </div>
        <article className="mb-8 prose md:prose-xl">
          <div
            dangerouslySetInnerHTML={{ __html: md().render(content!.content) }}
          />
        </article>
      </article>
    </div>
  );
}
