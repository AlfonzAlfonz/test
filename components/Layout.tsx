import React, { FC } from "react";
import { Box, Flex, Typography, Stack, Heading1, Lead, BoxProps, Container, lighten } from "@xcorejs/ui";
import Link from "./Link";

interface Props {
  hero?: boolean;
}

const Layout: FC<Props> = ({ hero, children }) => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Flex position="fixed" width="100%" p="1rem" bg="grey">
        <Container>
          <Box width="100%">
            <Link href="/">
              <Heading1 lineHeight="5.5rem" fontSize="3rem" color="#ddd">
                Blog name
              </Heading1>
            </Link>
          </Box>
          <Typography as="div" flexShrink={0}>
            <Stack gap="4rem">
              <Link href="/" v="simple" {...LinkStyle}>Home</Link>
              <Link href="/[id]" as="/first" v="simple" {...LinkStyle}>First</Link>
            </Stack>
          </Typography>
        </Container>
      </Flex>

      {hero && (
        <Flex
          pt="7.6rem"
          height="70vh"
          maxHeight="550px"
          alignItems="center"
          justifyContent="center"
          borderBottom="1px solid #ccc"
          flexDirection="column"
          bg={lighten("primary", 0.3)}
        >
          <Heading1>Welcome to this blog</Heading1>
          <Lead mb="6rem" fontSize="2rem">This blog is built by GIT cms!</Lead>
        </Flex>
      )}
      <Box flexGrow={1} pt={hero ? 0 : "7.6rem"}>
        {children}
      </Box>
      <Flex flexDirection="row-reverse" p="2rem" mt="5rem">
        <Typography>Content managed by GIT cms</Typography>
      </Flex>
    </Flex>
  );
};

export default Layout;

const LinkStyle: BoxProps = {
  lineHeight: 3.5,
  color: "#ddd"
};
