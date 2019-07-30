/// <reference types="node" />

declare module 'luna-react' {
  declare class Container extends React.Component<ComponentProps, any> {
    constructor(children: any)
    public clone(): Container
  }

  declare class Table extends React.Component<TableProps, any> { }

  declare class OutlinedButton extends React.Component<OutlinedButtonProps, any> { }

  declare class AutocompleteField extends React.Component<AutocompleteFieldProps, any> { }

  declare class AsyncAutocompleteField extends React.Component<AsyncAutocompleteFieldProps, any> { }

  declare class SwitchField extends React.Component<SwitchFieldProps, any> { }

  declare class Accordion extends React.Component<AccordionProps, any> { }

  declare class AccordionItem extends React.Component<AccordionItemProps, any> { }

  declare class TableContainer extends React.Component<TableContainerProps, any> { }

  declare class TableBody extends React.Component<TableBodyProps, any> { }

  declare class TableCell extends React.Component<TableCellProps, any> { }

  declare class TableRow extends React.Component<TableRowProps, any> { }

  declare class ProgressIndicator extends React.Component<ProgressIndicatorProps, any> { }

  declare class ProgressBar extends React.Component<ProgressBarProps, any> { }

  declare class TableHeaderRow extends React.Component<TableHeaderRowProps, any> { }

  declare class TableHeaderCell extends React.Component<TableHeaderCellProps, any> { }

}
