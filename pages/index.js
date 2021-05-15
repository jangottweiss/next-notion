import Head from "next/head";
import Image from "next/image";
import Link from 'next/link'
import utilStyles from '../styles/utils.module.css'
import { getAllPosts } from "../lib/notion";
import styles from "../styles/Home.module.css";
import Date from '../components/date'


export async function getStaticProps() {
  const allPostsData = await getAllPosts();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <div className={styles.container}>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ notionId, id, title, date }) => (
            <li className={utilStyles.listItem} key={notionId}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
