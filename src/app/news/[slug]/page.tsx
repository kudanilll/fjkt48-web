import md from "markdown-it";
import matter from "gray-matter";
import PageWrapper from "@/app/page-wrapper";
import { Image } from "@nextui-org/image";
import { getNewsFromStorage } from "@/utils/get-data";

async function getNews(slug: string) {
  try {
    const content = await getNewsFromStorage(slug);
    return matter(content);
  } catch(err) {
    return null;
  }
}

export default async function DetailNewsPage(props: any) {
  const content = await getNews(props.params.slug);
  if(content == null) {
    return (
      <PageWrapper>
        <div className="h-screen flex flex-col items-center justify-center">
          <h1 className="font-semibold text-center mb-4">404: Berita tidak ditemukan :(</h1>
          <article className="font-regular text-center">Buka beranda untuk menemukan berita terbaru!</article>
        </div>
      </PageWrapper>
    );
  }
  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-2xl font-poppins font-semibold mb-2">{content!.data.title}</h1>
        <Image
          className="w-full object-cover rounded-2xl"
          width="100%"
          alt={content.data.title}
          src={content.data.image}/>
      </div>
      <article>
        <div className="mb-6 flex-col justify-center text-center">
          <div className="font-regular text-base md:text-lg tracking-wide">
            <span>
              Sumber
              <a href={`https://${content!.data.source}`} target="_blank" className="hover:underline"> {content!.data.source}</a>
            </span>
          </div>
          <div className="font-regular text-base md:text-lg tracking-wide">Diterbitkan pada {content!.data.date}</div>
        </div>
        <article className="mb-8 prose md:prose-xl">
          <div dangerouslySetInnerHTML={{ __html: md().render(content!.content) }}/>
        </article>
      </article>
    </PageWrapper>
  );
}