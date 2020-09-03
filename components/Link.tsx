import React, { FC } from "react";
import NextLink, { LinkProps } from "next/link";
import { Link as UILink, ExtendedLinkProps } from "@xcorejs/ui";

const Link: FC<LinkProps & Omit<ExtendedLinkProps, "as">> = ({ href, as, replace, scroll, ...props }) => {
  return (
    <NextLink {...{ href, as, replace, scroll }} passHref>
      <UILink {...props} />
    </NextLink>
  );
};

export default Link;
