import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header, Hero, LogInForm } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

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
        <title>Log in Page - {generalSettings.title}</title>
      </Head>

      <Hero title="Log in Page" />

      <main className="content content-single">
        <div className="wrap">
          <LogInForm />
        </div>
      </main>

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
