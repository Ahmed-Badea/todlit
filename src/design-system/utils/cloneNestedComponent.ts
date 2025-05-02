import { ReactNode, isValidElement, Children, cloneElement, ElementType } from "react";

export const cloneNestedComponent = (
  child: ReactNode,
  targetComponent: ElementType,
  additionalProps?: Record<string, unknown>
): ReactNode => {
  // If child is not a valid React element, return as is
  if (!isValidElement(child)) {
    return undefined;
  }

  // Check if current child matches target component
  if (child.type === targetComponent) {
    return cloneElement(child, {
      ...child.props,
      ...additionalProps,
    });
  }

  // Handle nested children recursively
  if (child.props.children) {
    const updatedChildren = Children.map(child.props.children, (nestedChild) => {
      if (!isValidElement(nestedChild)) {
        return nestedChild;
      }
      return cloneNestedComponent(nestedChild, targetComponent, additionalProps);
    });

    return cloneElement(child, {}, ...updatedChildren);
  }

  return undefined;
};