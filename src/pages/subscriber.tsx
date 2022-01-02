import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header, Hero, AuthContent } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import Link from "next/link";

export default function Page() {
  const { useQuery } = client;
  const generalSettings = useQuery().generalSettings;

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Members {generalSettings.title}</title>
      </Head>
      <AuthContent>
        <Hero title="Members Only" />

        <main className="content content-single">
          <p>Here is some top-secret members-only content!</p>
          <p>
            Cannot access <Link href="/log-in">unauthenticated page</Link> -
            will be redirect back here.
          </p>
        </main>
      </AuthContent>
      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
