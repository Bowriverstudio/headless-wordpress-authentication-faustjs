import React from "react";
import styles from "scss/components/Header.module.scss";
import Link from "next/link";
import { client, MenuLocationEnum } from "client";

interface Props {
  title?: string;
  description?: string;
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
