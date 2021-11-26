import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header, Hero, SignUpForm } from "components";
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
        <title>Sign up - {generalSettings.title}</title>
      </Head>

      <Hero title="Sign up" />

      <main className="content content-single">
        <div className="wrap">
          <SignUpForm />
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
