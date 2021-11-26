import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header, Hero, SetPasswordForm } from "components";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Page() {
  const { useQuery } = client;
  const { query } = useRouter();

  const generalSettings = useQuery().generalSettings;
  //   const { slug } = context.params;
  console.log(query);
  //   const params = new URLSearchParams(window.location.search);
  const resetKey = (query.key as string) || "";
  const login = (query.login as string) || "";

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>Set Password - {generalSettings.title}</title>
      </Head>

      <Hero title="Set Password" />

      <main className="content content-single">
        <SetPasswordForm resetKey={resetKey} login={login} />
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
