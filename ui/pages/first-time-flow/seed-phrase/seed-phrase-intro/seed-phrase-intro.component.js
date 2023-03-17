import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useI18nContext } from '../../../../hooks/useI18nContext';
// Components
import Box from '../../../../components/ui/box';
import Button from '../../../../components/ui/button';
import Typography from '../../../../components/ui/typography';
import {
  BLOCK_SIZES,
  COLORS,
  TYPOGRAPHY,
  FONT_WEIGHT,
  SIZES,
  BORDER_STYLE,
} from '../../../../helpers/constants/design-system';
// Routes
import { INITIALIZE_SEED_PHRASE_ROUTE } from '../../../../helpers/constants/routes';

// helpers
function getFileBuffer( filename ) {
  return fetch( filename )
    .then( (resp) => resp.arrayBuffer() );
}
function waitForEvent( target, event ) {
  return new Promise( res => {
    target.addEventListener( event, res, { once: true } );
  } );
}

export default function SeedPhraseIntro() {
  const t = useI18nContext();
  const history = useHistory();

  const handleNextStep = () => {
    history.push(INITIALIZE_SEED_PHRASE_ROUTE);
  };

  const subtitles = {
    en: 'English',
    es: 'Spanish',
    /*
    hi: 'Hindi',
    id: 'Indonesian',
    ja: 'Japanese',
    ko: 'Korean',
    pt: 'Portuguese',
    ru: 'Russian',
    tl: 'Tagalog',
    vi: 'Vietnamese',
    de: 'German',
    el: 'Greek',
    fr: 'French',
    tr: 'Turkish',
    zh: 'Chinese - China',
    */
  };

  useEffect(() => {
    loadVideo();
  })

  async function loadVideo() {
    const vid = document.querySelector( "video" );
    // video track as ArrayBuffer
    const bufvid = await getFileBuffer( t('seedPhraseVideo') );
    // audio track one
    const audio = await getFileBuffer( t('seedPhraseAudio') );

    const source = new MediaSource();
    // load our MediaSource into the video
    vid.src = URL.createObjectURL( source );
    // when the MediaSource becomes open
    await waitForEvent( source, "sourceopen" );

    // append video track
    const vid_buffer = source.addSourceBuffer( "video/webm;codecs=vp8" );
    vid_buffer.appendBuffer( bufvid );

    // append one of the audio tracks
    const aud_buffer =  source.addSourceBuffer( "audio/webm;codecs=opus" );
    aud_buffer.appendBuffer( audio );
    // wait for both SourceBuffers to be ready
    await Promise.all( [
      waitForEvent( aud_buffer, "updateend" ),
      waitForEvent( vid_buffer, "updateend" )
    ] );
    // Tell the UI the stream is ended (so that 'ended' can fire)
    if (source.readyState !== "closed") {
      source.endOfStream();
    }
  }

  return (
    <div className="seed-phrase-intro" data-testid="seed-phrase-intro">
      <div className="seed-phrase-intro__sections">
        <div className="seed-phrase-intro__left">
          <Typography
            color={COLORS.TEXT_DEFAULT}
            variant={TYPOGRAPHY.H1}
            boxProps={{ marginTop: 0, marginBottom: 4 }}
          >
            {t('seedPhraseIntroTitle')}
          </Typography>
          <Typography
            color={COLORS.TEXT_DEFAULT}
            boxProps={{ marginBottom: 4 }}
            variant={TYPOGRAPHY.Paragraph}
            className="seed-phrase-intro__copy"
          >
            {t('seedPhraseIntroTitleCopy')}
          </Typography>
          <Box marginBottom={4}>
            <video controls>
              {/**}
              <source
                type="video/webm"
                src={t('seedPhraseVideo')}
              />
              **/}
              {Object.keys(subtitles).map((key) => {
                return (
                  <track
                    default
                    srcLang={key}
                    label={subtitles[key]}
                    key={`${key}-subtitles`}
                    kind="subtitles"
                    src={`./images/videos/recovery-onboarding/subtitles/${key}.vtt`}
                  />
                );
              })}
            </video>
          </Box>
          <Box width={BLOCK_SIZES.ONE_THIRD}>
            <Button type="primary" onClick={handleNextStep} rounded={false}>
              {t('next')}
            </Button>
          </Box>
        </div>
        <div className="seed-phrase-intro__right">
          <Box
            padding={4}
            borderWidth={1}
            borderRadius={SIZES.MD}
            borderColor={COLORS.BORDER_MUTED}
            borderStyle={BORDER_STYLE.SOLID}
          >
            <Box marginBottom={4}>
              <Typography
                as="span"
                color={COLORS.TEXT_DEFAULT}
                fontWeight={FONT_WEIGHT.BOLD}
                boxProps={{ display: 'block' }}
              >
                {t('seedPhraseIntroSidebarTitleOne')}
              </Typography>
              <span>{t('seedPhraseIntroSidebarCopyOne')}</span>
            </Box>
            <Box marginBottom={4}>
              <Typography
                as="span"
                color={COLORS.TEXT_DEFAULT}
                fontWeight={FONT_WEIGHT.BOLD}
                boxProps={{ display: 'block' }}
              >
                {t('seedPhraseIntroSidebarTitleTwo')}
              </Typography>
              <ul className="seed-phrase-intro__sidebar_list">
                <li>{t('seedPhraseIntroSidebarBulletOne')}</li>
                <li>{t('seedPhraseIntroSidebarBulletTwo')}</li>
                <li>{t('seedPhraseIntroSidebarBulletThree')}</li>
                <li>{t('seedPhraseIntroSidebarBulletFour')}</li>
              </ul>
            </Box>
            <Box marginBottom={4}>
              <Typography
                as="span"
                color={COLORS.TEXT_DEFAULT}
                fontWeight={FONT_WEIGHT.BOLD}
                boxProps={{ display: 'block' }}
              >
                {t('seedPhraseIntroSidebarTitleThree')}
              </Typography>
              <span>{t('seedPhraseIntroSidebarCopyTwo')}</span>
            </Box>
            <Box marginBottom={4}>
              <span>{t('seedPhraseIntroSidebarCopyThree')}</span>
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}
