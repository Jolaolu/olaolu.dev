import Vue from 'vue'
import { ThemeProvider } from 'vue-styled-components'

// global styles
import '@saucedrip/core/normalize-css'
import '@/base/global-styles'

import { mapState } from 'vuex'
import { theme } from '@/base/theme'
import { CURRENT_SECTION, HEADER_COMPACT } from './constants'

// prettier-ignore
export default Vue.component('App', {
  computed: mapState([
    CURRENT_SECTION,
    HEADER_COMPACT,
  ]),

  render() {
    return (
      <ThemeProvider id="app" theme={theme}>
        <a href="#main" id="skip-link">
          Skip to navigation
        </a>
        <Header
          compact={this.isPortrait ? false : this.isHeaderCompact}
          currentSection={this.currentSection}
          store={this.$store}
        />
        <RouterView />
        <Footer currentSection={this.currentSection} />
      </ThemeProvider>
    )
  },
})
