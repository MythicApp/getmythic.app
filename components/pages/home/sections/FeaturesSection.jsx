import { Download } from 'react-feather';
import Link from 'next/link';
import Tile from '@/components/common/Tile';
import Typography from '@/components/common/Typography';
import { Grid, GridItem, Section, Stack } from '@/components/common/layout';
import HighlightedText from '@/components/common/HighlightedText';
import Image from "next/image";
import React from "react";
import styled from 'styled-components';
import { useSite } from '@/components/common/Site';
import { mediaQueries } from '@/styles/breakpoints';

const FeatureSplitStack = styled(Stack)`
  align-items: stretch;

  .feature-copy,
  .feature-media {
    min-width: 0;
    width: 100%;
  }

  .feature-media {
    display: flex;
    align-items: center;
  }

  .feature-media > span {
    width: 100% !important;
    max-width: 100% !important;
  }

  .feature-media img {
    width: 100% !important;
    height: auto !important;
    object-fit: contain;
  }

  @media ${mediaQueries.xl} {
    .feature-copy,
    .feature-media {
      width: auto;
      flex: 1 1 0;
    }

    .feature-copy {
      justify-content: center;
    }

    .feature-media {
      align-items: stretch;
    }

    .feature-media > span {
      height: 100% !important;
    }

    .feature-media img {
      height: 100% !important;
    }
  }
`;

const FeaturesSection = () => {
  const { colorScheme = "light" } = useSite();
  return (
    <Section contained="lg" gutterBottom>
      <Stack style={{ textAlign: 'center', marginBottom: 48 }}>
        <Typography variant="headline">Friends gaming without you?</Typography>
        <br />
        <Typography variant="headline">
          <HighlightedText>Mythic fixes that.</HighlightedText>
        </Typography>
      </Stack>
      <Grid columns={{ lg: 2, xl: 3 }} gap>
        <GridItem as={Tile} width={{ lg: 2 }}>
          <FeatureSplitStack direction={{ md: 'vertical', lg: 'horizontal' }} gap={2}>
            <Stack className="feature-copy" direction='vertical' gap={2}>
              <Typography variant="eyebrow">Plenty of games, <HighlightedText>one place.</HighlightedText></Typography>
              <Typography variant="body">
                Mythic brings your entire game library together, regardless of whether they&apos;re macOS games, Windows® games, Epic games, manually downloaded games, or otherwise.
                <br />
                <br />
                Launch, manage, and customise your play experience without juggling a million apps.
              </Typography>
            </Stack>
            <div className="feature-media">
              <Image
                key={colorScheme}
                className="feature-image-hover"
                width={481}
                height={282}
                src={`/mythic-library-grid-${colorScheme}.avif`}
                alt="Mythic screenshot"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </FeatureSplitStack>
        </GridItem>
        <GridItem as={Tile} height={{ lg: 2 }} width={{ lg: 2, xl: 1 }}>
          <FeatureSplitStack direction={{ xs: 'vertical', md: 'vertical', lg: 'horizontal', xl: 'vertical' }} gap={2}>
            <Stack className="feature-copy" direction='vertical' gap={2}>
              <Typography variant="eyebrow">Import <HighlightedText>everything.</HighlightedText></Typography>
              <Typography variant="body">
                Import games from existing launchers and local installations in mere minutes.
                <br />
                <br />
                Mythic will automatically organise, and prepare them for launching — no assembly required.
              </Typography>
            </Stack>
            <div className="feature-media">
              <Image
                key={colorScheme}
                className="feature-image-hover"
                width={481}
                height={282}
                src={`/mythic-epicgameimportview-${colorScheme}.avif`}
                alt="Mythic screenshot"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </FeatureSplitStack>
        </GridItem>
        <GridItem as={Tile} width={{ lg: 2 }} style={{background: 'linear-gradient(180deg, #7541FF, #5412FF)', color: 'white'}}>
          <FeatureSplitStack direction={{ md: 'vertical', lg: 'horizontal', xl: 'vertical' }} gap={2}>
            <Download />
            <Stack className="feature-copy" direction='vertical' gap={2}>
              <Typography variant="eyebrow" style={{color: 'white'}}>What&apos;re you still waiting for?</Typography>
              <Typography variant="body" style={{color: 'white'}}>
                <Link href="/download">Download Mythic</Link> today, and join the revolution in gaming on macOS.
              </Typography>
            </Stack>
            {/*
            <video
              src="/mythic-library-grid-dark.mov"
              autoPlay
              muted
              loop
              playsInline
            />
            */}
          </FeatureSplitStack>
        </GridItem>
        <GridItem as={Tile} width={{ lg: 2, xl: 1 }}>
          <FeatureSplitStack direction={{ md: 'vertical', lg: 'horizontal', xl: 'vertical' }} gap={2}>
            <Stack className="feature-copy" direction='vertical' gap={2}>
              <Typography variant="eyebrow"><HighlightedText>Powerful</HighlightedText> game controls.</Typography>
              <Typography variant="body">
                Mythic minimises time wasted fiddling with techy settings, and terminal hacks.
                <br />
                <br />
                The intuitive game settings view lets you tweak launch arguments, verify file integrity, and more with just a few clicks.
              </Typography>
            </Stack>
            <div className="feature-media">
              <Image
                key={colorScheme}
                className="feature-image-hover"
                width={481}
                height={282}
                src={`/mythic-gamesettingsview-${colorScheme}.avif`}
                alt="Mythic screenshot"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </FeatureSplitStack>
        </GridItem>
        <GridItem width={{ lg: 2 }} as={Tile}>
          <FeatureSplitStack direction={{md: 'vertical', lg: 'horizontal', xl: 'vertical' }} gap={2}>
            <Stack className="feature-copy" direction='vertical' gap={2}>
              <Typography variant="eyebrow">Less managing, <HighlightedText>more gaming.</HighlightedText></Typography>
              <Typography variant="body">
                Download, update, and install games from multiple storefronts with ease.
              </Typography>
            </Stack>
            <div className="feature-media">
              <Image
                key={colorScheme}
                className="feature-image-hover"
                width={481}
                height={282}
                src={`/mythic-operations-demo-${colorScheme}.avif`}
                alt="Mythic screenshot"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </FeatureSplitStack>
        </GridItem>
        <GridItem as={Tile} width={{ lg: 2, xl: 1 }}>
          <FeatureSplitStack direction={{md: 'vertical', lg: 'horizontal', xl: 'vertical' }} gap={2}>
            <Stack className="feature-copy" direction='vertical' gap={2}>
              <Typography variant="eyebrow">Containers for dummies.</Typography>
              <Typography variant="body">
                Create multiple containers of Windows® directly within Mythic, and choose to keep some games isolated from others.
              </Typography>
            </Stack>
            <div className="feature-media">
              <Image
                key={colorScheme}
                className="feature-image-hover"
                width={481}
                height={282}
                src={`/mythic-containerconfirgurationview-${colorScheme}.avif`}
                alt="Mythic screenshot"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </FeatureSplitStack>
        </GridItem>
        <GridItem as={Tile} width={{ lg: 2, xl: 1 }} >
          <FeatureSplitStack direction={{md: 'vertical', lg: 'horizontal', xl: 'vertical' }} gap={2}>
            <Stack className="feature-copy" direction='vertical' gap={2}>
              <Typography variant="eyebrow">It just works!</Typography>
              <Typography variant="body">
                Mythic&apos;s onboarding experience guides your through setting up the application, swiftly.
              </Typography>
            </Stack>
            <div className="feature-media">
              <Image
                key={colorScheme}
                className="feature-image-hover"
                width={481}
                height={282}
                src={`/mythic-onboarding-engineinstall-${colorScheme}.avif`}
                alt="Mythic screenshot"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          </FeatureSplitStack>
        </GridItem>
        <GridItem as={Tile} width={{ lg: 2, xl: 1 }} >
          <FeatureSplitStack direction={{md: 'vertical', lg: 'horizontal', xl: 'vertical' }} gap={2}>
            <Stack className="feature-copy" direction='vertical' gap={2}>
              <Typography variant="eyebrow">Open-source, <HighlightedText>open season.</HighlightedText></Typography>
              <Typography variant="body">
                Check out Mythic&apos;s Discord community!
              </Typography>
            </Stack>
            <div className="feature-media">
              <iframe
                src={`https://discord.com/widget?id=1154998702650425397&theme=${colorScheme}`}
                width="100%"
                height="224px"
                allowTransparency="true"
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
              </iframe>
            </div>
          </FeatureSplitStack>
        </GridItem>
      </Grid>
    </Section>
  );
}

export default FeaturesSection;
