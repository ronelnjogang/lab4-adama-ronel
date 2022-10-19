import React from "react";

import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";

import Header from '../../components/Header'


export async function getStaticPaths() {
  // get  ids
  const files = fs.readdirSync("posts");
  const paths = files.map((filename) => ({
    params: {
       id: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: {  id } }) {
  // get content for each blog
  console.log( id);
  const mdfile = fs.readFileSync(`posts/${ id}.md`);
  const { data: frontMatter, content } = matter(mdfile);

  return {
    props: {
      frontMatter,
      content,
    },
  };
}

function BlogPage({ frontMatter, content }) {
  console.log(frontMatter);
  console.log(content);
  return (
    <>
    <Header></Header>
    <div class='container-fluid section1'>
        <div>
          <p class='title'>{frontMatter.title}</p>
        </div>
      </div>
    <div className='container p-10'>
      <article
        className='prose lg:prose-xl'
        dangerouslySetInnerHTML={{ __html: md().render(content) }}
      />
    </div>
  </>
  );
}

export default BlogPage;