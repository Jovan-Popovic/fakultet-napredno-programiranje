import type { Meta, StoryObj } from "@storybook/react-vite";

import { ScrollBar } from "./components/scroll-bar";

import { ScrollArea } from "./index";

const meta = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-[300px] w-[300px] rounded-md border border-gray-200 p-4 dark:border-gray-700">
      <div className="space-y-4">
        <h4 className="text-sm leading-none font-medium">Scrollable Content</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <p key={i} className="text-muted-foreground text-sm">
            Item {i + 1}: This is a scrollable content area with vertical scrolling.
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-[600px] rounded-md border border-gray-200 p-4 whitespace-nowrap dark:border-gray-700">
      <div className="flex gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex h-[100px] w-[200px] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 font-medium text-white"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const Both: Story = {
  render: () => (
    <ScrollArea className="h-[400px] w-[600px] rounded-md border border-gray-200 p-4 dark:border-gray-700">
      <div className="grid grid-cols-4 gap-4" style={{ width: "1200px" }}>
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="flex h-[100px] items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 font-medium text-white"
          >
            {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const TagList: Story = {
  render: () => (
    <ScrollArea className="h-[200px] w-[350px] rounded-md border border-gray-200 p-4 dark:border-gray-700">
      <div className="flex flex-wrap gap-2">
        {[
          "React",
          "Vue",
          "Angular",
          "Svelte",
          "Next.js",
          "Nuxt.js",
          "Gatsby",
          "Remix",
          "Astro",
          "SolidJS",
          "TypeScript",
          "JavaScript",
          "TailwindCSS",
          "Styled Components",
          "Emotion",
          "CSS Modules",
          "SASS",
          "LESS",
          "PostCSS",
          "Vite",
          "Webpack",
          "Rollup",
          "Parcel",
          "esbuild",
        ].map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ScrollArea className="h-[500px] w-[700px] rounded-md border border-gray-200 p-6 dark:border-gray-700">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Long Article</h1>
        <p className="text-muted-foreground text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <h2 className="mt-6 text-xl font-semibold">Section 1</h2>
        <p className="text-muted-foreground text-sm">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
        <p className="text-muted-foreground text-sm">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
          architecto beatae vitae dicta sunt explicabo.
        </p>
        <h2 className="mt-6 text-xl font-semibold">Section 2</h2>
        <p className="text-muted-foreground text-sm">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
        <p className="text-muted-foreground text-sm">
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
          velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
          quaerat voluptatem.
        </p>
        <h2 className="mt-6 text-xl font-semibold">Section 3</h2>
        <p className="text-muted-foreground text-sm">
          Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam,
          nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea
          voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat
          quo voluptas nulla pariatur?
        </p>
        <p className="text-muted-foreground text-sm">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
          cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
          est laborum et dolorum fuga.
        </p>
      </div>
    </ScrollArea>
  ),
};
