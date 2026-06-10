import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
};

type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
};

type ButtonProps = (NativeButtonProps | AnchorButtonProps) & {
  children: ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  as = 'button',
  children,
  icon,
  variant = 'secondary',
  className = '',
  ...props
}: ButtonProps) {
  const buttonClassName = `ui-button ${variant} ${className}`.trim();
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (as === 'a') {
    return (
      <a className={buttonClassName} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={buttonClassName}
      type="button"
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
