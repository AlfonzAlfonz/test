import React, { FC } from "react";
import Layout from "components/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { promises as fs } from "fs";
import path from "path";
import { Container, Heading1, Lead, LoremIpsum, Paragraph, Box } from "@xcorejs/ui";
import R from "ramda";
import { contentPath, directoryFiles } from "utils";
import { Node } from "slate";
import SlateValue from "components/SlateValue";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: await R.pipe(
    () => contentPath("posts"),
    directoryFiles,
    R.andThen(R.map(f => ({ params: { id: path.parse(f).name } })))
  )(),
  fallback: false
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    post: await R.pipe(
      () => contentPath("posts", params.id as string + ".json"),
      fs.readFile,
      R.andThen(R.pipe(
        R.toString,
        JSON.parse
      ))
    )()
  }
});

export interface Post {
  title: string;
  lead: string;
  text: Node[];
}

export const Index: FC<{ post: Post }> = ({ post }) => {
  return (
    <Layout>
      <Container>
        <Box pt="2rem">
          <Heading1 pb="2rem">{post.title}</Heading1>
          <Lead>{post.lead}</Lead>

          <SlateValue value={post.text} />
        </Box>
      </Container>
    </Layout>
  );
};

export default Index;
