import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const BlogId = ({blog}) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        {blog.tags.map(tag => (
          <div key={tag.id}>
            <span>{tag.name}</span>
          </div>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{__html: `${blog.body}`}}></div>
      <div>
          <br />
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch('https://tomtechblog.microcms.io/api/v1/blogs', key);
  const repos = await res.json();

  const paths = repos.contents.map(repo => `/blogs/${repo.id}`); 
    return {paths, fallback: false};
  };

export const getStaticProps = async context => {
  const id = context.params.id;

  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch(
    `https://tomtechblog.microcms.io/api/v1/blogs/${id}`,
    key,
  );
  const blog = await res.json();

  return {
    props : {
      blog: blog,
    }
  };
};

export default BlogId;