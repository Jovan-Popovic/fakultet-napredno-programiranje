import type { Meta, StoryObj } from "@storybook/react-vite";
import type {
  ColumnOrderState,
  // ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  PaginationState,
  // PaginationState,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

import { TableVariants } from "./enums/table";

import { Table } from "@/components/ui/table";
// import { ColumnPinPosition } from "@/components/ui/table/enums/columns";
import type { TableColumnRecord } from "@/components/ui/table/types/columns";
import { Tooltip } from "@/components/ui/tooltip";

export default {
  title: "UI/Table",
  component: Table,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 900, margin: "2rem auto" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "striped", "bordered"],
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Table>;

// -----------------------------------------------------------------------------
// Sample data & columns
// -----------------------------------------------------------------------------

type ExampleRow = {
  id: number;
  name: string;
  age: number | null;
  country: string;
  balance: number;
  status: "active" | "inactive" | null;
  nonVisible: number;
};

const data: ExampleRow[] = [...Array(45)].map((_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
  age: 20 + ((i * 3) % 15),
  country: ["USA", "UK", "Canada", "Germany", "France"][i % 5],
  balance: 1000 + i * 234,
  status: i % 2 === 0 ? "active" : "inactive",
  nonVisible: i + 4,
}));

const totals: ExampleRow = {
  id: 0,
  name: "TOTAL",
  age: null,
  country: "",
  balance: data.reduce((sum, r) => sum + r.balance, 0),
  status: null,
  nonVisible: 0,
};
const tooltipExampleColumn: TableColumnRecord<ExampleRow> = {
  name: "info",
  header: "Info",
  enableSorting: false,
  enableDragging: false,
  enablePinning: false,
  enableResizing: false,
  size: 70,
  render: () => (
    <Tooltip content="More info about this row">
      <div>Example</div>
    </Tooltip>
  ),
};

const baseColumns: TableColumnRecord<ExampleRow>[] = [
  {
    name: "name",
    header: "Name",
    enableSorting: true,
    enableDragging: true,
    enablePinning: true,
    enableResizing: true,
    size: 140,
    enableHiding: false,
    enableGrouping: true,
    // pin: ColumnPinPosition.LEFT,
  },
  {
    name: "age",
    header: "Age",
    enableSorting: true,
    enableDragging: true,
    enablePinning: true,
    enableResizing: true,
    size: 140,
    enableGrouping: true,
    isVisible: false,
  },
  {
    name: "country",
    header: "Country",
    enableSorting: true,
    enableDragging: true,
    enablePinning: true,
    enableResizing: true,
    size: 140,
  },
  {
    name: "balance",
    header: "Balance",
    enableSorting: true,
    enableDragging: true,
    enablePinning: true,
    // pin: ColumnPinPosition.RIGHT,
    formatter: (value) => `$${value.toLocaleString()}`,
    size: 140,

    enableResizing: true,
  },
  {
    name: "status",
    header: "Status",
    enableSorting: true,
    enableDragging: true,
    enablePinning: true,
    enableResizing: true,
    size: 140,
  },
  {
    name: "nonVisible",
    header: "Non Visible",
    enableSorting: true,
    enableDragging: true,
    enablePinning: true,
    enableResizing: true,
    size: 140,
    isVisible: false,
  },
];

// -----------------------------------------------------------------------------
// Re‑usable state hook for the stories
// -----------------------------------------------------------------------------

const useTableStates = () => {
  // const paginationState = useState<PaginationState>({ pageIndex: 0, pageSize: 5 });
  // const sortingState = useState<SortingState>([]);
  const rowSelectionState = useState<RowSelectionState>({});
  // const columnOrderState = useState<ColumnOrderState>([]);
  const columnPinningState = useState<ColumnPinningState>({ left: [], right: [] });
  const columnSizingState = useState<ColumnSizingState>({});
  const expandedState = useState<ExpandedState>({});

  return {
    // paginationState,
    // sortingState,
    rowSelectionState,
    // columnOrderState,
    columnPinningState,
    columnSizingState,
    expandedState,
  };
};

const useFullTableStates = () => {
  const paginationState = useState<PaginationState>({ pageIndex: 0, pageSize: 5 });
  const sortingState = useState<SortingState>([
    {
      id: "balance",
      desc: true,
    },
  ]);
  const rowSelectionState = useState<RowSelectionState>({});
  const columnOrderState = useState<ColumnOrderState>([]);
  const columnPinningState = useState<ColumnPinningState>({ left: [], right: [] });
  const columnSizingState = useState<ColumnSizingState>({});
  const expandedState = useState<ExpandedState>({});

  return {
    paginationState,
    sortingState,
    rowSelectionState,
    columnOrderState,
    columnPinningState,
    columnSizingState,
    expandedState,
  };
};

// -----------------------------------------------------------------------------
// Stories
// -----------------------------------------------------------------------------
export const Default: StoryObj = {
  name: "Default - Table",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={Math.ceil(data.length)}
        {...states}
        hasPagination
        variant={TableVariants.DEFAULT}
      />
    );
  },
};

export const Striped: StoryObj = {
  name: "Striped - Table",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={data.length}
        {...states}
        hasPagination
        variant={TableVariants.STRIPED}
      />
    );
  },
};

export const Bordered: StoryObj = {
  name: "Bordered - Table",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={data.length}
        {...states}
        hasPagination
        variant={TableVariants.BORDERED}
      />
    );
  },
};

// 1 ▸ Basic table (no sorting)
export const NoSorting: StoryObj = {
  name: "Basic - No sorting",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        columns={baseColumns.map((c) => ({ ...c, enableSorting: false }))}
        data={data}
        pageCount={data.length}
        {...states}
        hasPagination={false}
      />
    );
  },
};

// 2 ▸ Sortable table
export const Sortable: StoryObj = {
  name: "With sorting + pagination",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={data.length}
        {...states}
        hasPagination
      />
    );
  },
};

// 3 ▸ Column pinning
export const PinnedColumns: StoryObj = {
  name: "Pinned columns",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={data.length}
        {...states}
        hasPagination={false}
      />
    );
  },
};

// 4 ▸ Drag‑and‑drop column re‑ordering
export const DraggableColumns: StoryObj = {
  name: "Draggable columns",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={data.length}
        {...states}
        hasPagination={false}
      />
    );
  },
};

// 5 ▸ Resizable columns
export const ResizableColumns: StoryObj = {
  name: "Resizable columns",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        columns={baseColumns.map((c) => ({ ...c, enableResizing: true }))}
        data={data}
        pageCount={data.length}
        {...states}
        hasPagination={false}
        columnSizingState={states.columnSizingState}
      />
    );
  },
};

// 6 ▸ Row selection
export const SelectableRows: StoryObj = {
  name: "Selectable rows",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={data.length}
        {...states}
        hasPagination={false}
        rowSelectionState={states.rowSelectionState}
      />
    );
  },
};

// 7 ▸ Expandable rows
export const ExpandableRows: StoryObj = {
  name: "Expandable rows",
  render: () => {
    const states = useTableStates();
    const expandable = data.map((d) => ({
      rowId: String(d.id),
      content: (
        <div className="p-4">
          <strong>{d.name}</strong> is {d.age} years old and lives in {d.country}. Current balance:
          ${d.balance}.
        </div>
      ),
    }));

    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={data.length}
        expandable={expandable}
        expandedState={states.expandedState}
        expandToggleLocation="name"
        expandToggleIcons={{
          open: ChevronRightIcon,
          closed: ChevronDownIcon,
        }}
        expandSingleRow
        rowIdColumnName="id"
        rowIdWithIndex={false}
        rowSelectionState={states.rowSelectionState}
        columnPinningState={states.columnPinningState}
        columnSizingState={states.columnSizingState}
        hasPagination={false}
      />
    );
  },
};

export const RenderedExpandedRows: StoryObj = {
  name: "Expanded rendered rows ",
  render: () => {
    const states = useTableStates();

    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={data.length}
        expandedState={states.expandedState}
        expandToggleLocation="name"
        expandToggleIcons={{ open: ChevronRightIcon, closed: ChevronDownIcon }}
        expandSingleRow
        renderExpandedRowContent={(rowData: ExampleRow, rowId: string) => (
          <div className="p-4 text-sm">
            <div>
              <strong>{rowData.name}</strong> (ID: {rowId}) from {rowData.country}
            </div>
            <div>Age: {rowData.age}</div>
            <div>
              Balance: <span className="font-mono">${rowData.balance.toLocaleString()}</span>
            </div>
            <div>Status: {rowData.status}</div>
          </div>
        )}
        hasPagination={false}
        hasColumnVisibility={true}
        rowSelectionState={states.rowSelectionState}
        // columnOrderState={states.columnOrderState}
        columnPinningState={states.columnPinningState}
        columnSizingState={states.columnSizingState}
      />
    );
  },
};

// 8 ▸ Totals row
export const WithTotals: StoryObj = {
  name: "With totals row",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        totals={totals}
        pageCount={data.length}
        {...states}
        shouldCenterTotalSize
        hasPagination={false}
      />
    );
  },
};

// 9 ▸ Loading state
export const Loading: StoryObj = {
  name: "Loading overlay",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        loading
        columns={baseColumns}
        data={data}
        pageCount={data.length}
        {...states}
      />
    );
  },
};

export const EmptyTable: StoryObj = {
  name: "Empty data",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={[]}
        pageCount={0}
        {...states}
        hasPagination={false}
      />
    );
  },
};

const longTextData = data.map((row) => ({
  ...row,
  name: row.name + " — This is a very long name that should wrap or truncate accordingly",
}));

export const LongText: StoryObj = {
  name: "Table with long text",
  render: () => {
    const states = useTableStates();
    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={longTextData}
        pageCount={longTextData.length}
        {...states}
        hasPagination={false}
      />
    );
  },
};

export const ExpandableNestedTable: StoryObj = {
  name: "Expandable rows with nested table",
  render: () => {
    const states = useTableStates();

    const nestedColumns: TableColumnRecord<ExampleRow>[] = [
      {
        name: "country",
        header: "Country",
        enableSorting: false,
        size: 120,
      },
      {
        name: "status",
        header: "Status",
        enableSorting: false,
        size: 120,
      },
      {
        name: "balance",
        header: "Balance",
        formatter: (value) => `$${value.toLocaleString()}`,
        enableSorting: false,
        size: 140,
      },
    ];

    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={data.length}
        expandedState={states.expandedState}
        expandToggleLocation="name"
        expandToggleIcons={{ open: ChevronRightIcon, closed: ChevronDownIcon }}
        expandSingleRow
        hasPagination={false}
        rowSelectionState={states.rowSelectionState}
        columnPinningState={states.columnPinningState}
        columnSizingState={states.columnSizingState}
        renderExpandedRowContent={(rowData: ExampleRow) => {
          const nestedData = [rowData];

          return (
            <div className="rounded-md border bg-gray-50 p-3 dark:bg-gray-900">
              <div className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
                Transactions for: <span className="text-foreground">{rowData.name}</span>
              </div>
              <Table<ExampleRow>
                columns={nestedColumns}
                data={nestedData}
                pageCount={nestedData.length}
                hasPagination={false}
                variant={TableVariants.STRIPED}
              />
            </div>
          );
        }}
      />
    );
  },
};

export const AllStatesEnabled: StoryObj = {
  name: "All states enabled",
  render: () => {
    const states = useFullTableStates();

    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={Math.ceil(data.length)}
        hasPagination
        variant={TableVariants.DEFAULT}
        {...states}
        renderExpandedRowContent={(rowData: ExampleRow) => (
          <>
            <strong>{rowData.name}</strong> from {rowData.country} — Age {rowData.age} — Balance: $
            {rowData.balance.toLocaleString()}
          </>
        )}
        sortingState={states.sortingState}
        expandToggleLocation="name"
        expandToggleIcons={{ open: ChevronRightIcon, closed: ChevronDownIcon }}
        shouldCenterTotalSize
        enableRowResizing
      />
    );
  },
};

export const TableWithStickyHeader: StoryObj = {
  name: "Table with sticky header",
  render: () => {
    const states = useFullTableStates();

    return (
      <div className="position-relative max-w-[900px]">
        <Table<ExampleRow>
          columns={baseColumns}
          data={data}
          pageCount={Math.ceil(data.length / states.paginationState[0].pageSize)}
          variant={TableVariants.DEFAULT}
          {...states}
          shouldCenterTotalSize
          tableHeadClassName="sticky top-0 z-10"
        />
      </div>
    );
  },
};

export const TableWithFIxedHeight: StoryObj = {
  name: "Table with fixed height",
  render: () => {
    const states = useFullTableStates();

    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={Math.ceil(data.length / states.paginationState[0].pageSize)}
        variant={TableVariants.DEFAULT}
        {...states}
        sortingState={states.sortingState}
        shouldCenterTotalSize
        tableWrapperClassName="max-h-[500px]"
      />
    );
  },
};

export const TableWithStickyHeaderAndFixedHeight: StoryObj = {
  name: "TableWithStickyHeader and fixed height",
  render: () => {
    const states = useFullTableStates();

    return (
      <Table<ExampleRow>
        columns={baseColumns}
        data={data}
        pageCount={Math.ceil(data.length / states.paginationState[0].pageSize)}
        variant={TableVariants.DEFAULT}
        {...states}
        shouldCenterTotalSize
        tableHeadClassName="sticky top-0 z-10"
        tableWrapperClassName="max-h-[500px]"
      />
    );
  },
};

export const TableWithTooltip: StoryObj = {
  name: "Table with tooltip",
  render: () => {
    const states = useFullTableStates();

    return (
      <Table<ExampleRow>
        columns={[...baseColumns, tooltipExampleColumn]}
        data={data}
        pageCount={Math.ceil(data.length / states.paginationState[0].pageSize)}
        variant={TableVariants.DEFAULT}
        {...states}
        shouldCenterTotalSize
      />
    );
  },
};
