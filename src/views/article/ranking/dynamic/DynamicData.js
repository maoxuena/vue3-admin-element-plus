import i18n from '@/i18n'

const t = i18n.global.t

export default () => [
  {
    label: t('msg.article.ranking'),
    prop: 'ranking',
    minWidth: 60
  },
  {
    label: t('msg.article.title'),
    prop: 'title',
    minWidth: 120
  },
  {
    label: t('msg.article.author'),
    prop: 'author',
    minWidth: 100
  },
  {
    label: t('msg.article.publicDate'),
    prop: 'publicDate',
    minWidth: 120
  },
  {
    label: t('msg.article.desc'),
    prop: 'desc',
    minWidth: 200
  },
  {
    label: t('msg.article.action'),
    prop: 'action',
    minWidth: 140
  }
]
