import Link from "next/link";
import { forwardRef } from "react";

const NextLink = forwardRef((props: any, ref) => {
  const { href, children, type, ...rest } = props;
  return (
    <Link href={href} ref={ref} {...rest}>
        {children}
    </Link>
  );
});

NextLink.displayName = "NextLink";

export default NextLink;
