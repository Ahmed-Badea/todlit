// types/Table/TableActionButton.ts
import { IButtonStyleProps } from "../../Button/common";

export interface ITableActionButtonProps extends IButtonStyleProps {
  row: any;
  label: string;
  actionKey: string;
  actionHandlers: {
    [key: string]: (row: any) => Promise<void> | void;
  };
}
