import { getNextStaticProps } from "@faustjs/next";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { client, PhotoIdType, PostObjectFieldFormatEnum } from "client";

export default function Single() {
  const router = useRouter();
  const { photoSlug } = router.query;
  const { useQuery } = client;
  const slug = Array.isArray(photoSlug) ? photoSlug.join("/") : photoSlug;

  const post = useQuery().photo({
    id: Array.isArray(photoSlug) ? photoSlug.join("/") : photoSlug,
    idType: PhotoIdType.SLUG,
  });

  return (
    <>
      <div>
        Post Title:{" "}
        {post?.title({ format: PostObjectFieldFormatEnum.RENDERED })}
      </div>
      <div>
        Post Content:{" "}
        <div dangerouslySetInnerHTML={{ __html: post?.content() ?? "" }} />
      </div>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page: Single,
    client,
  });
}

/**
 * Since the page name 'does not' use catch-all routes,
 * for example [slug],
 * that's why params would contain just slug and not an array of slugs , unlike [...slug].
 * For example, If we need to have dynamic route '/foo/'
 * Then we would add paths: [ params: { slug: 'foo' } } ]
 * Here slug will be 'foo', then Next.js will statically generate the page at /foo/
 *
 * At build time next js will will make an api call get the data and
 * generate a page bar.js inside .next/foo directory, so when the page is served on browser
 * data is already present, unlike getInitialProps which gets the page at build time but makes an api
 * call after page is served on the browser.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
 * @see https://github.com/imranhsayed/nextjs-headless-wordpress/blob/main/frontend/pages/blog/%5Bslug%5D.js
 *
 * @returns {Promise<{paths: [], fallback: boolean}>}
 */
export async function getStaticPaths() {
  // const posts = client.useQuery().photos()?.nodes;

  // const pathsData = [];

  // posts &&
  //   posts.map((post) => {
  //     pathsData.push({ params: { slug: post?.slug } });
  //   });

  return {
    paths: [],
    fallback: "blocking",
  };
}
