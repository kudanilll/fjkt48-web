export default interface ButtonProps {
  children?: React.ReactNode;
  icon?: any;
  href?: string;
  label: string;
  loading?: boolean;
  onClick?: () => void;
}
