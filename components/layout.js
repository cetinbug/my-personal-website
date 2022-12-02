import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Switch from "react-switch";
import useTranslation from 'next-translate/useTranslation'

import { TiArrowBack, TiArrowLeftThick, TiArrowRightThick } from "react-icons/ti";
import { MdLightMode, MdNightlight } from "react-icons/md";

export const name = 'Bugra Cetin'
export const siteTitle = 'cetinbug'

const SwitchTheme = () => {
  const [mounted, setMounted] = useState(false)
  const [checked, setChecked] = useState(false);
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    setChecked(!!(theme == 'dark'))
  }, [])

  if (!mounted) {
    return null
  }

  const handleChange = nextChecked => {
    (theme === 'dark' ? setTheme('light') : setTheme('dark'))
    setChecked(nextChecked);
  };

  return (
    <div className={styles.switchContainer}>
      <label style={{ display: 'flex' }}>
        <Switch
          onChange={handleChange}
          checked={checked}
          checkedIcon={<MdLightMode style={{ color: '#ffd666', margin: '0.2px 0px 2.5px 3px', height: '17px' }} />}
          uncheckedIcon={<MdNightlight style={{ color: '#e9c062', margin: '0.2px 0px 2.5px 3px', height: '17px' }} />}
          height={18}
          width={42}
          handleDiameter={20}
          offColor="#55534e"
          onColor="#c75e5e"
          offHandleColor="#c75e5e"
          onHandleColor="#55534e"
          activeBoxShadow="0px"
          borderRadius={12}
          lineHeight='26.2px'
        />
      </label>

    </div>
  );
};

export default function Layout({ children, home, post }) {

  const router = useRouter()
  const { asPath, locale } = router
  const { t } = useTranslation('common')
  const projectsT = t('PROJECTS')
  const back2HomeFirstT = t('back2HomeFirst')
  const back2HomeSecT = t('back2HomeSec')
  const back2HomeT = post ? back2HomeSecT : back2HomeFirstT
  const prevArtT = t('prevArt')
  const nextArtT = t('nextArt')
  function persistLocaleCookie() {
    const newLocale = locale == 'tr' ? 'en' : 'tr'
    const date = new Date()
    const expireMs = 100 * 24 * 60 * 60 * 1000 // 100 days
    date.setTime(date.getTime() + expireMs)
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`
  }

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="personal website of bugra cetin"
        />
        <meta
          property="og:image"
          content={'/images/coverOf.png'}
        />

        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <div className={[styles.groupOfHeader].join(' ')}>
          <Link href="/" className={[styles.titleOfbig, styles.titleOf].join(' ')}>CETINBUG</Link>
          <Link href="/blog" className={[styles.titleOflittle, styles.titleOf].join(' ')}>BLOG</Link>
          {/* <Link href="/projects" className={[styles.titleOflittle, styles.titleOf].join(' ')}>{projectsT}</Link> */}
          <Link target="_blank" className={[styles.titleOflittle, styles.titleOf].join(' ')} title ={'My Cv'} href='/cv/cvWithoutRef.pdf' >CV</Link>
        </div>
        <div className={[styles.groupOfHeader].join(' ')} style={{ columnGap: '1rem' }}>
          <SwitchTheme />
          <Link href={asPath} className={[styles.titleOflittle, styles.titleOf, utilStyles.langChange].join(' ')} locale={locale == 'tr' ? 'en' : 'tr'} onClick={persistLocaleCookie} title={locale == 'tr' ? 'English' : 'Turkish'}>{locale == 'tr' ? 'en' : 'tr'}</Link>
        </div>

      </header>
      <main>{children}</main>
      {!home && !post && (
        <div className={styles.nav}>
          <Link href="/" className={[utilStyles.row, utilStyles.navTo].join(' ')}>
            <TiArrowBack />
            <span>{back2HomeFirstT}</span>
          </Link>
        </div>
      )}
      {post && (
        <div className={[utilStyles.row, utilStyles.alignCenter, utilStyles.wrap, styles.nav].join(' ')}>
          <div className={styles.backToHome}>
            <Link href={post.prevPath} className={[utilStyles.row, utilStyles.navTo].join(' ')}>
              <TiArrowBack />
              <span>{back2HomeT}</span>
            </Link>
          </div>
          {post.prevNext.prev ?
            (<Link href={`/blog/${post.prevNext.prev}`} className={[utilStyles.row, utilStyles.navTo].join(' ')} >
              <TiArrowLeftThick />
              <span>{prevArtT}</span>
            </Link>) : ''}
          {post.prevNext.next ?
            (<Link href={`/blog/${post.prevNext.next}`} className={[utilStyles.row, utilStyles.navTo].join(' ')} >
              <span>{nextArtT}</span>
              <TiArrowRightThick />
            </Link>) : ''}
        </div>

      )}
    </div>
  )
}