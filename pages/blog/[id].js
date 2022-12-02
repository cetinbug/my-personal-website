import Layout from '../../components/layout';
import { getAllPostIds, getPostData, getSortedPostsData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import utilStyles from '../../styles/utils.module.css';
import { BsCalendar3, BsClock } from "react-icons/bs";
import rehypePrism from '@mapbox/rehype-prism';
import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const prevNext = getSortedPostsData(params.id);
  const postData = await getPostData(params.id);
  const mdxSource = await serialize(postData.contentOfMdx, {
    mdxOptions: { rehypePlugins: [rehypePrism] },
  });
  return {
    props: {
      postData,
      prevNext,
      source: mdxSource,

    },
  };
}


export default function Post({ postData, prevNext, source }) {
  //

  if (postData.pinned && postData.order == 26) {
    prevNext.next = 'first-250-days-of-software-dev-part-1'
    prevNext.prev = null
  }
  if (postData.order == 25) {
    prevNext.next = null
  }
  if (postData.order == 1) {
    prevNext.prev = 'first-250-days-of-software-dev-part-intro'
  }

  const { t } = useTranslation('blogDetail')
  const minReadT = t('minRead')
  const titleT = (postData.order == 26) ? t('titleBlogIntro') : ( (postData.order < 26) ? t('titleBlog', {order: postData.order}) : postData.title)

  return (
    <Layout post={{ prevNext, prevName: 'Blog', prevPath: '/blog' }}>
      <Head>
        <title>{titleT}</title>
      </Head>
      <article>
        
        <h1 className={utilStyles.headingXl} style={{maxWidth: '520px'}}>{titleT}</h1>
        <div className={[utilStyles.row, utilStyles.wrap].join(' ')} style={{ columnGap: '1rem' }}>
          <div className={[utilStyles.row, utilStyles.dateOfBlog].join(' ')} style={{ fontSize: '15px' }}>
            <BsCalendar3 />
            <Date dateString={postData.date} />
          </div>
          <div className={[utilStyles.row, utilStyles.dateOfBlog].join(' ')} style={{ fontSize: '15px' }}>
            <BsClock />
            <span style={{ color: 'var(--textDateDetail)' }}>{postData.readtime} {minReadT}</span>
          </div>
        </div>
        <MDXRemote {...source} components={{Trans}} />

      </article>
      <style global jsx>{`
          a {
            color: var(--textLink2);
            text-decoration: underline;
          }
          a:hover {
            color: var(--textLink2Hover);
          }
          h1{
            /* color:var(--textNormal); */
            color:var(--textLink);
          }
          h2{
            color:var(--textHeader2);
          }
          h3{
            color:var(--textHeader2);
          }
          h4{
            color:var(--textHeader2);
          }
          p{
            color:var(--textNormal);
          }
          li{
            color:var(--textNormal);
          }
          blockquote{
            border-left: 8px solid #447385;
            margin-left: 0px;
            padding: 0.5em 1em 0.5em 2em;
          }
          article{
            color:var(--textNormal);
          }
        `}</style>
    </Layout>
  );
}
