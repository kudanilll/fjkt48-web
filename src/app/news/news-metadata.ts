export type NewsMetadata = {
  title: string;
  image: string;
  date: string;
  slug: string;
  category: string;
  source: string;
};

export default const getNewsMetadata = (): NewsMetadata[] => {
  const folder = "src/assets/posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`${folder}${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      image: matterResult.data.image,
      date: matterResult.data.date,
      slug: fileName.replace(".md", ""),
      category: matterResult.data.category,
      source: matterResult.data.author,
    };
  });
  return posts;
};