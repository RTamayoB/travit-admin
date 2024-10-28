import type { Meta, StoryObj } from "@storybook/react";

import Typography from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Design System/Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url:
        "https://www.figma.com/design/jT69LhIFVmKzyWtOVBrLf7/Travit's-components?node-id=1-757&t=gkBaWpYSIz8aB3AM-1",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: "Default",
  },
};

export const H1: Story = {
  args: {
    children: "H1",
    variant: "h1",
  },
};

export const H1Bold: Story = {
  args: {
    children: "H1 bold",
    variant: "h1",
    bold: true,
  },
};

export const H2: Story = {
  args: {
    children: "H2",
    variant: "h2",
  },
};

export const H2Bold: Story = {
  args: {
    children: "H2 bold",
    variant: "h2",
    bold: true,
  },
};

export const H3: Story = {
  args: {
    children: "H3",
    variant: "h3",
  },
};

export const H3Bold: Story = {
  args: {
    children: "H3 bold",
    variant: "h3",
    bold: true,
  },
};

export const H4: Story = {
  args: {
    children: "H4",
    variant: "h4",
  },
};

export const H4Bold: Story = {
  args: {
    children: "H4 bold",
    variant: "h4",
    bold: true,
  },
};

export const H5: Story = {
  args: {
    children: "H5",
    variant: "h5",
  },
};

export const H5Bold: Story = {
  args: {
    children: "H5 bold",
    variant: "h5",
    bold: true,
  },
};

export const H6: Story = {
  args: {
    children: "H6",
    variant: "h6",
  },
};

export const H6Bold: Story = {
  args: {
    children: "H6 bold",
    variant: "h6",
    bold: true,
  },
};

export const Subtitle: Story = {
  args: {
    children: "Subtitle",
    variant: "subtitle",
  },
};

export const SubtitleBold: Story = {
  args: {
    children: "Subtitle bold",
    variant: "subtitle",
    bold: true,
  },
};

export const BodyLarge: Story = {
  args: {
    children: "Body large",
    variant: "bodyLarge",
  },
};

export const BodyLargeBold: Story = {
  args: {
    children: "Body large bold",
    variant: "bodyLarge",
    bold: true,
  },
};

export const BodyMedium: Story = {
  args: {
    children: "Body medium",
    variant: "bodyMedium",
  },
};

export const BodyMediumBold: Story = {
  args: {
    children: "Body medium bold",
    variant: "bodyMedium",
    bold: true,
  },
};

export const BodySmall: Story = {
  args: {
    children: "Body small",
    variant: "bodySmall",
  },
};

export const BodySmallBold: Story = {
  args: {
    children: "Body small bold",
    variant: "bodySmall",
    bold: true,
  },
};

export const Button: Story = {
  args: {
    children: "Button",
    variant: "button",
  },
};

export const ButtonBold: Story = {
  args: {
    children: "Button bold",
    variant: "button",
    bold: true,
  },
};

export const Note: Story = {
  args: {
    children: "Note",
    variant: "note",
  },
};

export const NoteBold: Story = {
  args: {
    children: "Note bold",
    variant: "note",
    bold: true,
  },
};

export const Footnote: Story = {
  args: {
    children: "Footnote",
    variant: "footnote",
  },
};

export const FootnoteBold: Story = {
  args: {
    children: "footnote bold",
    variant: "footnote",
    bold: true,
  },
};
