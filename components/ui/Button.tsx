'use client';

import React, { forwardRef } from 'react';
import {
  Button as HeroButton,
  type ButtonProps as HeroButtonProps,
} from '@heroui/react';

export interface ButtonProps extends Omit<HeroButtonProps, 'variant' | 'size'> {
  /**
   * The visual style of the button
   */
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'flat'
    | 'light'
    | 'outline-gradient'
    | 'shimmer'
    | 'bordered';

  /**
   * Size of the button
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Whether the button is currently loading
   */
  isLoading?: boolean;

  /**
   * Text to display when button is in loading state
   */
  loadingText?: string;

  /**
   * Whether the button is an icon-only button
   */
  isIconOnly?: boolean;

  /**
   * Content to display before the button text
   */
  startContent?: React.ReactNode;

  /**
   * Content to display after the button text
   */
  endContent?: React.ReactNode;

  /**
   * Additional CSS classes to apply
   */
  className?: string;

  /**
   * Button children/content
   */
  children?: React.ReactNode;

  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent) => void;

  /**
   * Whether the button is disabled
   */
  isDisabled?: boolean;

  /**
   * Additional props
   */
  [key: string]: any;
}

/**
 * A modern, themeable button component that follows the design system
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    loadingText,
    isIconOnly = false,
    startContent,
    endContent,
    className = '',
    children,
    onClick,
    ...rest
  } = props;

  // Handle deprecated onClick by mapping it to onPress
  const eventHandlers = onClick ? { onPress: onClick } : {};

  // Map our variant to HeroUI's variant
  const getHeroVariant = (): HeroButtonProps['variant'] => {
    switch (variant) {
      case 'primary':
        return 'solid';
      case 'secondary':
      case 'bordered':
        return 'bordered';
      case 'flat':
        return 'flat';
      case 'light':
        return 'light';
      case 'outline-gradient':
      case 'shimmer':
        return 'bordered';
      default:
        return 'solid';
    }
  };

  // Construct the className based on the props
  const getButtonClasses = () => {
    const classes = ['btn', 'cursor-pointer'];

    // Add size class
    classes.push(`btn-${size}`);

    // Add variant class
    classes.push(`btn-${variant}`);

    // Add icon class if icon-only
    if (isIconOnly) {
      classes.push('btn-icon');
      if (size === 'sm') classes.push('btn-icon-sm');
      if (size === 'lg' || size === 'xl') classes.push('btn-icon-lg');
    }

    // Add loading class
    if (isLoading) {
      classes.push('btn-loading');
    }

    // Add shimmer effect class
    if (variant === 'shimmer') {
      classes.push('btn-shimmer');
    }

    return classes.join(' ');
  };

  // Map our size to HeroUI's size
  const getHeroSize = (): HeroButtonProps['size'] => {
    if (size === 'xs') return 'sm';
    if (size === 'xl') return 'lg';
    return size as HeroButtonProps['size'];
  };

  // Pass through the HeroUI Button with our custom classes
  return (
    <HeroButton
      ref={ref}
      variant={getHeroVariant()}
      size={getHeroSize()}
      isDisabled={isLoading || rest.isDisabled}
      startContent={isLoading ? null : startContent}
      endContent={isLoading ? null : endContent}
      className={className}
      {...eventHandlers}
      {...rest}
    >
      {isLoading && loadingText ? loadingText : children}
    </HeroButton>
  );
});

Button.displayName = 'Button';

export default Button;
