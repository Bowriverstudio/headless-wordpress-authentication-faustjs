import { getNextStaticProps } from "@faustjs/next";
import { client } from "client";
import { Footer, Header, Hero, AuthContent, ProfileForm } from "components";
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
        <title>Profile {generalSettings.title}</title>
      </Head>
      <AuthContent>
        <Hero title="Profile" />

        <main className="content content-single">
          <ProfileForm />
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
