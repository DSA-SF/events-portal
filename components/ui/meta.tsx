import Head from "next/head";
import { FC } from "react";

export interface MetaProps {
  title?: string;
  children: React.ReactNode;
}

const defaultTitle = "Zoomies";
const titleTemplate = (title?: string) => (title && title.length > 0 ? `${title} | ${defaultTitle}` : defaultTitle);

export const Meta: FC<MetaProps> = ({ title, children }) => {
  return (
    <Head>
      <title>{titleTemplate(title)}</title>
      <meta name="description" key="description" content="Zoomies" />
      {children}
    </Head>
  );
};

export default Meta;