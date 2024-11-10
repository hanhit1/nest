import i18n from 'i18next';
import Backend from 'i18next-fs-backend';

i18n
  .use(Backend)
  .init({
    fallbackLng: false,
    preload: ['en', 'vi'],
    backend: {
      loadPath: './src/locales/{{lng}}/translation.json',
    }, 
  })
export default i18n;
