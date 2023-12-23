import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import marked from "marked";
import PageWrapper from "@/app/page-wrapper";
import { Image } from "@nextui-org/react";

function getNewsContent(slug: string) {
  const folder = "src/assets/posts/";
  const file = `${folder}${slug}.md`;
  try {
    const content = fs.readFileSync(file, "utf8");
    return matter(content);
  } catch(err) {
    return null;
  }
}

export default function DetailNewsPage(props: any) {
  const content = getNewsContent(props.params.slug);
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
          alt={content!.data.title}
          src={content!.data.image}/>
      </div>
      <article>
        <div className="mb-6 flex-col justify-center text-center">
          <div className="font-regular text-base md:text-lg tracking-wide">Sumber {content!.data.source}</div>
          <div className="font-regular text-base md:text-lg tracking-wide">Diterbitkan pada {content!.data.date}</div>
        </div>
        <div className="mb-8 prose md:prose-xl">
          {/*<Markdown>{content!.content}</Markdown>*/}
          <div
            dangerouslySetInnerHTML={{
              __html:
                marked(content!.content)
            }}/>
        </div>
      </article>
    </PageWrapper>
  );
}