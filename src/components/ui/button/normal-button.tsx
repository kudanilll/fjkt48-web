import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import ButtonProps from "./button-props";

export default function NormalButton(props: ButtonProps) {
  const { children, icon, href, label, loading, onClick } = props;
  return (
    <Link href={href ? href : ""} aria-label={label}>
      <Button
        loading={loading ? loading : false}
        variant="solid"
        onClick={onClick!}
        aria-label={label}>
        <div className="m-2 flex items-center justify-center">
          {icon && <div className="mr-2">{icon}</div>}
          <Text>{children && children}</Text>
        </div>
      </Button>
    </Link>
  );
}
