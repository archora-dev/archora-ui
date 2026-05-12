# Accessibility

Archora UI treats accessibility behavior as component behavior, not documentation-only guidance.

## Current Guarantees

- Focus-visible states are token-driven and present on interactive controls.
- Dialogs use `role="dialog"`, `aria-modal`, Escape close, outside click close, focus return, and Tab focus trapping.
- Dropdown, Select, Combobox, and DatePicker close on outside pointerdown.
- Dropdown, Select, Combobox, Command, DatePicker, Tabs, Tooltip, and Switch include keyboard interaction tests for their critical paths.
- FormField provides label, description, error, required, invalid, and `aria-describedby` slot wiring.
- Disabled states use native disabled behavior where native controls exist.

## Complex Components

- Dialog links title and description IDs to the dialog content. Keep `ArchDialogTitle` in every dialog and add `ArchDialogDescription` when the action needs context.
- Select and Combobox use listbox semantics and skip disabled options during keyboard selection.
- DatePicker uses ISO `YYYY-MM-DD` values. Min/max boundaries disable blocked days.
- Tooltip is for short, non-interactive help text and opens from hover or focus. Escape closes the focused tooltip.

## Consumer Responsibilities

- Provide clear labels for icon-only or ambiguous controls.
- Keep tooltip content short and non-interactive.
- Validate final app flows with real assistive technology and product copy.
- Use semantic HTML around Archora components, especially inside forms and tables.
