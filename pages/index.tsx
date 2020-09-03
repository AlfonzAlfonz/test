import { Container, Heading2, Stack, Box, Card, Paragraph, Flex, Button } from "@xcorejs/ui";
import Layout from "components/Layout";
import SlateValue from "components/SlateValue";
import { promises as fs } from "fs";
import { GetStaticProps } from "next";
import * as R from "ramda";
import React, { FC } from "react";
import { Node } from "slate";
import { contentPath, directoryFiles } from "utils";
import { Post } from "./[id]";
import Link from "../components/Link";
import NextLink from "next/link";
import path from "path";

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    text: await R.pipe(
      () => contentPath("homepage.json"),
      fs.readFile,
      R.andThen(R.pipe(R.toString, JSON.parse))
    )(),
    posts: await R.pipe(
      () => contentPath("posts"),
      directoryFiles,
      R.andThen(dir =>
        Promise.all(dir.map(async f =>
          fs.readFile(contentPath("posts", f)).then(R.pipe(R.toString, JSON.parse, r => [path.parse(f).name, r]))
        )))
    )()
  }
});

export const Index: FC<{ text: Node[]; posts: [string, Post][] }> = ({ text, posts }) => {
  return (
    <Layout hero>
      <Container mt="3rem" flexDirection="column">
        <Stack gap="3rem" direction="column">
          <SlateValue value={text} />

          <Heading2>Latest posts</Heading2>

          {posts.map(([id, p], i) => (
            <Card
              key={id}
              title={<Link href="/[id]" as={`/${id}`} fontSize="inherit" v="underline">{p.title}</Link>}
              innerPadding="1rem 2rem"
              pt="2rem"
              _body={{ flexDirection: "column", padding: "0 2rem" }}
              body={(
                <Paragraph>{p.lead}</Paragraph>
              )}
              _footer={{ padding: "2rem", flexDirection: "row-reverse" }}
              footer={(
                <NextLink href="/[id]" as={`/${id}`} passHref>
                  <Button as="a">Read more</Button>
                </NextLink>
              )}
            />
          ))}
        </Stack>

      </Container>
    </Layout>
  );
};

export default Index;
