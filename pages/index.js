import Head from 'next/head'
import Layout, { siteTitle, name } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'
import Link from 'next/link';
import { HiOutlineBriefcase, HiAtSymbol, HiOutlineAcademicCap, HiOutlineBuildingLibrary, HiOutlineMapPin, HiOutlineArrowLongDown } from "react-icons/hi2";
import { SiGithub, SiGmail, SiStackoverflow, SiInstagram, SiLinkedin, SiAboutdotme } from "react-icons/si";
import { useTheme } from 'next-themes'
import useTranslation from 'next-translate/useTranslation'

export default function Home() {
  const { theme, setTheme } = useTheme()
  const filterRatio = (theme == 'dark') ? 'brightness(0.8)' : 'none';
  const { t } = useTranslation('index')
  const titleT = t('title')
  const companyT = t('company')
  const eduT = t('edu')
  const eduNameT = t('eduName')
  const locationT = t('location')
  const firstParT = t('firstPar')
  const secParT = t('secPar')
  const thirdParT = t('thirdPar')
  const fourthParT = t('fourthPar')


  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={[utilStyles.row, utilStyles.alignCenter, utilStyles.ppArea].join(' ')}>
        <Image
          priority
          src="/images/profile.jpg"
          className={[utilStyles.borderCircle].join(' ')}
          height={160}
          width={160}
          alt={name}
          style={{
            filter: filterRatio
          }}
          
        />
        <div className={[utilStyles.column, utilStyles.flex, utilStyles.containerOf].join(' ')}>
          <h1 className={utilStyles.specificHeader}>{name}</h1>
          <div className={[utilStyles.alignCenter, utilStyles.row, utilStyles.detailOfLittle, utilStyles.wrap].join(' ')} style={{ 'columnGap': '.8rem' }}>
            <div style={{ 'columnGap': '.2rem' }} className={[utilStyles.row, utilStyles.alignCenter].join(' ')}>
              <HiOutlineBriefcase />
              <span style={{color: 'var(--textDetail)'}}>{titleT}</span>
            </div>
            <div style={{ 'columnGap': '.2rem' }} className={[utilStyles.row, utilStyles.alignCenter].join(' ')}>
              <HiAtSymbol style={{ 'marginTop': '2px' }} />
              <Link target="_blank" href='https://oyuneks.com' className={utilStyles.detailLinkOf}>{companyT}</Link>
            </div>
          </div>
          <div className={[utilStyles.alignCenter, utilStyles.row, utilStyles.detailOfLittle, utilStyles.wrap].join(' ')} style={{ 'columnGap': '.8rem' }}>
            <div style={{ 'columnGap': '.2rem' }} className={[utilStyles.row, utilStyles.alignCenter].join(' ')}>
              <HiOutlineAcademicCap />
              <span style={{color: 'var(--textDetail)'}}>{eduT}</span>
            </div>
            <div style={{ 'columnGap': '.2rem' }} className={[utilStyles.row, utilStyles.alignCenter].join(' ')}>
              <HiOutlineBuildingLibrary />
              <Link target="_blank" href='https://en.wikipedia.org/wiki/Istanbul_Technical_University' className={utilStyles.detailLinkOf}>{eduNameT}</Link>
            </div>
          </div>
          <div className={[utilStyles.alignCenter, utilStyles.row, utilStyles.detailOfLittle, utilStyles.wrap].join(' ')} style={{ 'columnGap': '.8rem' }}>
            <div style={{ 'columnGap': '.2rem' }} className={[utilStyles.row, utilStyles.alignCenter].join(' ')}>
              <HiOutlineMapPin />
              <Link target="_blank" href='https://en.wikipedia.org/wiki/Antalya' className={utilStyles.detailLinkOf}>{locationT}</Link>
            </div>
          </div>
        </div>
      </div>

      <section className={[utilStyles.column, utilStyles.summaryOfMine].join(' ')} style={{ 'rowGap': '0.6rem', 'lineHeight': '1.3rem' }}>
        <span>{firstParT}</span>
        <span>{secParT}</span>
        <div className={utilStyles.column} style={{rowGap: '0.3rem'}}>
          <div className={[utilStyles.row, utilStyles.alignCenter].join(' ')} style={{ 'columnGap': '.3rem' }}>
            <span>{thirdParT}</span>
            <HiOutlineArrowLongDown />
          </div>
          <div className={[utilStyles.row, utilStyles.alignCenter, utilStyles.wrap].join(' ')} style={{ 'columnGap': '.3rem', 'rowGap': '.3rem' }}>
          <span className={utilStyles.specialitiesOf}>Fullstack</span>
            <span className={utilStyles.specialitiesOf}>Javascript</span>
            <span className={utilStyles.specialitiesOf}>Php</span>
            <span className={utilStyles.specialitiesOf}>Mysql</span>
            <span className={utilStyles.specialitiesOf}>Node.js</span>
            <span className={utilStyles.specialitiesOf}>Laravel</span>
            <span className={utilStyles.specialitiesOf}>OOP</span>
            <span className={utilStyles.specialitiesOf}>Html</span>
            <span className={utilStyles.specialitiesOf}>Css</span>
            <span className={utilStyles.specialitiesOf}>React</span>
            <span className={utilStyles.specialitiesOf}>Next.js</span>
            <span className={utilStyles.specialitiesOf}>React Native</span>
            <span className={utilStyles.specialitiesOf}>Matlab</span>
          </div>
          
        </div>
        <div className={utilStyles.column}>
            <div className={[utilStyles.row, utilStyles.alignCenter].join(' ')} style={{ 'columnGap': '.3rem' }}>
              <span>{fourthParT}</span>
              <HiOutlineArrowLongDown />
            </div>
            <div className={[utilStyles.row, utilStyles.alignCenter, utilStyles.wrap].join(' ')} style={{ 'columnGap': '.3rem', 'rowGap': '.3rem' }}>
              <Link target="_blank" className={utilStyles.socialLinksOf} title ={'Linkedin'} href='https://www.linkedin.com/in/cetinbugra/'><SiLinkedin/></Link>
              <Link target="_blank" className={utilStyles.socialLinksOf} href='mailto:bugra.cetin.itu@gmail.com'><SiGmail/></Link>
              <Link target="_blank" className={utilStyles.socialLinksOf} href='https://stackoverflow.com/users/14488190/bugracetin'><SiStackoverflow/></Link>
              <Link target="_blank" className={utilStyles.socialLinksOf} href='https://github.com/cetinbug'><SiGithub/></Link>
              <Link target="_blank" className={utilStyles.socialLinksOf} href='https://www.instagram.com/cetinbugraa'><SiInstagram/></Link>
            </div>
          </div>
         {/*  <div className={utilStyles.column}>
            <Link target="_blank" className={utilStyles.navTo} title ={'My Cv'} href='/cv/cvWithoutRef.pdf' >{fifthParT}</Link>
          </div> */}
      </section>
      
    </Layout>
  )
}
