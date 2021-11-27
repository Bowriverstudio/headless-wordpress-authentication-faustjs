import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header, Hero, SendPasswordResetEmailForm } from "components";
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
        <title>Forgot Password - {generalSettings.title}</title>
      </Head>

      <Hero title="Forgot Password" />

      <main className="content content-single">
        <SendPasswordResetEmailForm />
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
