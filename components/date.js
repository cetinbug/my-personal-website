import { parseISO, format } from 'date-fns';
import { useRouter } from 'next/router'
import { tr, enGB } from 'date-fns/locale'


export default function Date({ dateString }) {
  const router = useRouter()
  const { locale } = router
  const localeOf = locale == 'en' ? enGB : tr
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy', {locale : localeOf})}</time>;
}