import React, { FC, Fragment } from "react";
import type { Node, Text as SlateText } from "slate";
import type { RenderElementProps, RenderLeafProps } from "slate-react";
import { Typography, Text, ExtendedTypographyProps, ExtendedTextProps, BoxProps, Box } from "@xcorejs/ui";

import isPlainObject from "is-plain-object";

export interface ElementProps {
  _paragraph?: ExtendedTypographyProps;
  _heading?: ExtendedTypographyProps;
  _strong?: ExtendedTextProps;
}

const SlateValue: FC<{ value: Node[] } & ElementProps & BoxProps> = ({ value, _paragraph, _heading, _strong, ...props }) => {
  const el = { _heading, _strong, _paragraph };

  return (
    <Box {...props}>
      {value.map((n, i) => (
        <Fragment key={i}>{isText(n)
          ? renderLeaf(el)({ children: n.text, text: n, leaf: n, attributes: {} as any })
          : renderElement(el)({
            children: <SlateValue value={n.children} />,
            element: n,
            attributes: {} as any
          })}
        </Fragment>
      )
      )}
    </Box>
  );
};

export default SlateValue;

export const renderElement = ({ _heading, _paragraph }: ElementProps) => ({ children, element, ...attributes }: RenderElementProps) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <Typography variant="h3" {..._heading} {...attributes}>{children}</Typography>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <Typography variant="p" {..._paragraph} {...attributes}>{children}</Typography>;
  }
};

export const renderLeaf = ({ _strong }: ElementProps) => ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <Text variant="strong" fontSize="inherit" {..._strong}>{children}</Text>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  return <span {...attributes}>{children}</span>;
};

export const isText = (node: Node): node is SlateText =>
  isPlainObject(node) && typeof (node as any).text === "string";
