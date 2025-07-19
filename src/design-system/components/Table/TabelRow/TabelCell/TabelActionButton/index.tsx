import React, { useState } from "react";
import { Button } from "../../../../Button";
import { ITableActionButtonProps } from "../../../../../types/Table/TableActionButton";

export const TableActionButton: React.FC<ITableActionButtonProps> = ({
  row,
  label,
  actionKey,
  actionHandlers,
  color = "primary", // optional customizations
  size = "sm",
  variant = "contained",
  leadingIcon,
  trailingIcon,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const handler = actionHandlers?.[actionKey];
    if (!handler) return;

    try {
      setLoading(true);
      await handler(row);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      text={label}
      onClickHandler={handleClick}
      loading={loading}
      size={size}
      color={color}
      variant={variant}
      leadingIcon={leadingIcon}
      trailingIcon={trailingIcon}
    />
  );
};
