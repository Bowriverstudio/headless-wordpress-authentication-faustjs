import React from "react";
import styles from "scss/components/Header.module.scss";
import Link from "next/link";
import { client, MenuLocationEnum } from "client";

interface Props {
  title?: string;
  description?: string;
}
function UserRoleLinks(): JSX.Element {
  const { useAuth, useQuery } = client.auth;
  const { isLoading, isAuthenticated } = useAuth({ shouldRedirect: false });

  const { menuItems } = client.useQuery();

  const query = useQuery({
    prepare({ prepass, query }) {
      prepass(query.viewer, "roles");
    },
    suspense: false,
  });

  if (query.$state.isLoading) return <p>Loading...</p>;

  const role = query.viewer?.roles({ first: 1 }).nodes[0]?.name;

  const menuLinks =
    role == "subscriber"
      ? menuItems({
          where: { location: MenuLocationEnum.SUBSCRIBER },
        }).nodes
      : menuItems({
          where: { location: MenuLocationEnum.ADMIN },
        }).nodes;

  return (
    <>
      {role == "subscriber" && <div className="hidden">Subscribe</div>}
      <ul>
        {menuLinks?.map((link) => (
          <li key={`${link.label}$-menu`}>
            <Link href={link.url ?? ""}>
              <a href={link.url}>{link.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function UserRoleLinks2(): JSX.Element {
  const { useAuth, useQuery } = client.auth;
  const { isLoading, isAuthenticated } = useAuth({ shouldRedirect: false });

  const { menuItems } = client.useQuery();
  const viewer = useQuery()?.viewer;
  const role = viewer?.roles({ first: 1 }).nodes[0]?.name;

  const menuLinks =
    role == "subscriber"
      ? menuItems({
          where: { location: MenuLocationEnum.SUBSCRIBER },
        }).nodes
      : menuItems({
          where: { location: MenuLocationEnum.ADMIN },
        }).nodes;

  return (
    <>
      {role == "subscriber" && <div className="hidden">Subscribe</div>}
      <ul>
        {menuLinks?.map((link) => (
          <li key={`${link.label}$-menu`}>
            <Link href={link.url ?? ""}>
              <a href={link.url}>{link.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function Header({
  title = "Headless by WP Engine",
  description,
}: Props): JSX.Element {
  const { useAuth } = client.auth;
  const { isLoading, isAuthenticated } = useAuth({ shouldRedirect: false });

  const { menuItems } = client.useQuery();
  const viewer = client?.auth?.useQuery()?.viewer;

  const unauthenticatedLinks = menuItems({
    where: { location: MenuLocationEnum.UNAUTHENTICATED },
  }).nodes;

  const authenticatedLinks = menuItems({
    where: { location: MenuLocationEnum.AUTHENTICATED },
  }).nodes;

  return (
    <header>
      <div className={styles.wrap}>
        <div className={styles["title-wrap"]}>
          <p className={styles["site-title"]}>
            <Link href="/">
              <a>{title}</a>
            </Link>
          </p>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.menu}>
          <ul>
            {isLoading ? (
              <>Loading</>
            ) : isAuthenticated ? (
              <>
                <li>Hello {viewer?.firstName}</li>
                {authenticatedLinks?.map((link) => (
                  <li key={`${link.label}$-menu`}>
                    <Link href={link.url ?? ""}>
                      <a href={link.url}>{link.label}</a>
                    </Link>
                  </li>
                ))}
                <UserRoleLinks2 />
              </>
            ) : (
              <>
                {unauthenticatedLinks?.map((link) => (
                  <li key={`${link.label}$-menu`}>
                    <Link href={link.url ?? ""}>
                      <a href={link.url}>{link.label}</a>
                    </Link>
                  </li>
                ))}
              </>
            )}

            <li>
              <Link href="https://github.com/wpengine/faustjs">
                <a
                  className="button"
                  href="https://github.com/wpengine/faustjs"
                >
                  GitHub
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
