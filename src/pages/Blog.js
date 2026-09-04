import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import posts from "../data/blogPosts";

const Wrap = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 24px;
`;

const PostCard = styled.article`
  border-bottom: 1px solid ${({ palette }) => palette.border};
  padding: 16px 0;
`;

const Tag = styled.span`
  background: ${({ palette }) => palette.surface};
  color: ${({ palette }) => palette.textMuted};
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  margin-right: 4px;
`;

const Body = styled.div`
  margin-top: 24px;
  line-height: 1.7;
  font-size: 16px;
`;

const Blog = () => {
  const { slug } = useParams();
  const palette = { background: "#ffffff", surface: "#f9f9f9", text: "#111827", textMuted: "#6b7280", border: "#e5e7eb", accent: "#af9a7d" };

  if (slug) {
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
      return (
        <Wrap>
          <p>Post not found. <Link to="/blog">Back to blog</Link></p>
        </Wrap>
      );
    }
    return (
      <Wrap>
        <Link to="/blog">← Back to blog</Link>
        <h1 style={{ marginTop: 16 }}>{post.title}</h1>
        <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 16 }}>
          By {post.author} · {post.minutes} min read · {post.date}
        </div>
        <div>
          {post.tags.map((t) => <Tag key={t} palette={palette}>{t}</Tag>)}
        </div>
        <Body>
          {post.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Body>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <h1>Travel journal</h1>
      <p style={{ opacity: 0.7 }}>Stories from our team and guests.</p>
      {posts.map((p) => (
        <PostCard key={p.slug} palette={palette}>
          <h3 style={{ margin: "0 0 4px 0" }}>
            <Link to={`/blog/${p.slug}`}>{p.title}</Link>
          </h3>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.85 }}>{p.excerpt}</p>
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
            {p.author} · {p.minutes} min · {p.date}
          </div>
        </PostCard>
      ))}
    </Wrap>
  );
};

export default Blog;
