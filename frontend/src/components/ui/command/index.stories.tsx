import type { Meta, StoryObj } from "@storybook/react-vite";

import { CommandEmpty } from "./components/empty";
import { CommandGroup } from "./components/group";
import { CommandInput } from "./components/input";
import { CommandItem } from "./components/item";
import { CommandList } from "./components/list";
import { CommandSeparator } from "./components/separator";

import { Command } from ".";

const meta = {
  title: "UI/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command className="w-[450px] rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};

export const WithCountries: Story = {
  render: () => (
    <Command className="w-[450px] rounded-lg border shadow-md">
      <CommandInput placeholder="Search countries..." />
      <CommandList>
        <CommandEmpty>No country found.</CommandEmpty>
        <CommandGroup>
          <CommandItem>🇺🇸 United States</CommandItem>
          <CommandItem>🇬🇧 United Kingdom</CommandItem>
          <CommandItem>🇨🇦 Canada</CommandItem>
          <CommandItem>🇦🇺 Australia</CommandItem>
          <CommandItem>🇩🇪 Germany</CommandItem>
          <CommandItem>🇫🇷 France</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
