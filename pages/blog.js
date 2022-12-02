import Head from 'next/head'
import Layout, { siteTitle, name } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';
import { useTheme } from 'next-themes'
import { BsCalendar3, BsClock } from "react-icons/bs";
import { GiSafetyPin } from "react-icons/gi";
import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData,
        },
    };
}


export default function Blog({ allPostsData }) {
    const { theme, setTheme } = useTheme()
    const filterRatio = (theme == 'dark') ? 'brightness(0.8)' : 'none';
    const { t } = useTranslation('blog')
    const minReadT = t('minRead')
    return (
        <Layout>
            <Head>
                <title>{siteTitle + ' | blog'}</title>
            </Head>
            <h1 className={utilStyles.headingOf}>Blog</h1>
            <div className={[utilStyles.row, utilStyles.listOfCover].join(' ')}>
                {allPostsData.map(({ id, date, title, summary, photo, readtime, pinned, order }) => (
                    <div className={[utilStyles.listOf, utilStyles.row, utilStyles.wrap].join(' ')} key={id}>
                        <Link className={utilStyles.imgCover} href={`/blog/${id}`}>
                            <Image
                                /* priority */
                                priority={order === 0}
                                src={'/images/blog/' + photo}
                                className={utilStyles.blogImg}
                                width={288}
                                height={360}
                                sizes="100vw"
                                style={{
                                    width: '100%',
                                    height: 'inherit',
                                    borderRadius: '8px',
                                    filter: filterRatio
                                }}
                                alt={title}
                            />
                        </Link>
                        <div className={utilStyles.column} style={{ flex: '1', maxHeight: '100%' }}>
                            <Link href={`/blog/${id}`} className={utilStyles.titleOfBlog}>{(order ===26 ) ? t('titleBlogIntro') : t('titleBlog', {order})}</Link>
                            <div className={[utilStyles.row, utilStyles.wrap].join(' ')} style={{ columnGap: '1rem' }}>
                                <div className={[utilStyles.row, utilStyles.dateOfBlog].join(' ')}>
                                    <BsCalendar3 />
                                    <Date dateString={date} />
                                </div>
                                <div className={[utilStyles.row, utilStyles.dateOfBlog].join(' ')}>
                                    <BsClock />
                                    <span style={{color: 'var(--textDateDetail)'}}>{readtime} {minReadT}</span>
                                </div>
                            </div>
                            <span className={utilStyles.summaryOfBlog}>{<Trans i18nKey={"blog:summaries." + order}/>}</span>
                        </div>
                        {pinned && <GiSafetyPin className={utilStyles.pinOf} title='pinned'/>}
                        
                    </div>
                ))}
            </div>

        </Layout>
    )
}
