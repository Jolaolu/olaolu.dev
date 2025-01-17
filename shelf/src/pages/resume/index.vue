<template>
  <StyledResume id="resume" :style="!ready && 'display: none'" :isPDF="isPDF">
    <div class="meta">
      <a
        target="_blank"
        class="no-marker linkedin"
        :href="socialProfiles.linkedIn"
        aria-label="Connect with Olaolu on LinkedIn"
        @click="$ga.event('Resume', 'click', 'LinkedIn Button')"
      >
        <LinkedInIcon />
      </a>
      <a
        class="no-marker"
        href="mailto:hello@olaolu.dev"
        aria-label="Send Olaolu a mail"
        @click="$ga.event('Resume', 'click', 'Mail Button')"
      >
        <MailIcon />
      </a>
      <a
        :href="resumePDF"
        target="_blank"
        :hidden="isPDF"
        class="no-marker"
        aria-label="Download a PDF copy of this resume"
        @click="$ga.event('Resume', 'click', 'Download PDF Button')"
      >
        <DownloadIcon />
        Download
      </a>
    </div>

    <aside>
      <section>
        <a href="https://olaolu.dev">olaolu.dev</a>
        <span>Lagos, Nigeria</span>
        <a
          href="mailto:hello@olaolu.dev"
          @click="$ga.event('Resume', 'click', 'Mail Link in Sidebar')"
        >
          hello@olaolu.dev
        </a>
      </section>

      <section>
        <h3>Core Technologies:</h3>
        <ul>
          <li v-for="(tech, index) in data.technologies" :key="index">
            {{ tech }}
          </li>
        </ul>
      </section>

      <section>
        <h3>Others:</h3>
        <ul>
          <li
            v-for="(proficiency, index) in data.otherProficiencies"
            :key="index"
          >
            {{ proficiency }}
          </li>
        </ul>
      </section>
    </aside>

    <article>
      <header id="profile-summary">
        <h1 id="name">Olaolu <br />Olawuyi</h1>
        <h2>Expert Frontend developer and UX Engineer.</h2>
        <p>
          Engineer valued for driving high-performance accessible web
          experiences. I design quality, user-friendly and scalable products
          regardless of stack.
        </p>
      </header>

      <section id="experience">
        <h3 class="heading">Experience</h3>

        <p>
          I’ve worked on a handful of web projects over the past
          {{ new Date().getFullYear() - 2011 }} years, some of which were for
          the following organizations:
        </p>

        <ul id="companies">
          <li
            v-for="(company, index) in data.companies"
            :key="index"
            class="company"
          >
            <header>
              <h4>
                {{ company.name }} <span>{{ company.role }}</span>
              </h4>
              <span class="period">{{ company.period }}</span>
            </header>

            <p>{{ company.intro }}</p>

            <ul class="points">
              <li v-for="(point, index) in company.points" :key="index">
                {{ point }}
              </li>
            </ul>

            <p v-html="company.outro" class="outro" />
          </li>
        </ul>
      </section>

      <section id="projects">
        <h3 class="heading">Projects</h3>
        <p>
          Links to some of my work can be found on
          <a
            href="https://olaolu.dev/work"
            @click="
              $ga.event('Resume', 'click', 'Work link', { transport: 'beacon' })
            "
          >
            olaolu.dev/work
          </a>
          and details can be provided upon request via a scheduled demo call.
        </p>
      </section>

      <SauceDripLogo id="logo" />
    </article>
  </StyledResume>
</template>

<style lang="scss">
#resume {
  --base-font-size: 16px;

  @media (min-width: 1441px) {
    --base-font-size: 19.2px;
  }

  body {
    transition: none;
    background-color: #fff;
  }

  h3,
  h4,
  a:not(.no-marker) {
    font-weight: bold;
    display: inline-block;

    &:not(.color-off) {
      color: var(--electric-blue);
    }
  }

  .heading,
  a:not(.no-marker) {
    z-index: 1;
    position: relative;

    &:after {
      content: '';
      background: var(--lime);
      height: 0.4em;
      width: 109%;
      display: block;
      margin-top: -0.6rem;
      margin-left: -4%;
      position: absolute;
      z-index: -1;
    }
  }

  a:not(.no-marker) {
    &:after {
      transform: none;
      transition: transform 0.3s;
    }

    &:hover:after {
      transform: translateY(0.2em) scaleY(0.5);
    }
  }
}
</style>

<script>
import data from './data'
import StyledResume from './styles'
import { createMeta } from '~/helpers'
import { MailIcon, DownloadIcon, LinkedInIcon } from '@saucedrip/core/icons'

export default {
  data: () => ({
    data,
    ready: process.env.NODE_ENV === 'development',
  }),

  created() {
    // hack to hide display until scripts for
    // styled components have been executed.
    // TODO: Fix this
    if (typeof window !== 'undefined') {
      window.setTimeout(() => (this.ready = true), 0)
    }
  },

  computed: {
    isPDF() {
      return this.$route.query.pdf === 'true'
    },
  },

  metaInfo() {
    return {
      title: `My Résumé`,
      meta: [
        ...createMeta.urls(this.resumeURL, 1),
        ...createMeta.titles(`Olaolu's Résumé`, 1),
        { name: 'og:locale', content: 'en_US' },
        { name: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@mrolaolu' },
        { name: 'twitter:creator', content: '@mrolaolu' },
      ],
    }
  },

  components: {
    MailIcon,
    StyledResume,
    DownloadIcon,
    LinkedInIcon,
  },
  name: 'Resume',
}
</script>
