export const sidebarMix = {
  methods: {
    handleAsideShow (val) {
      if (val) {
        this.$refs.msidebar.$el.style.width = '280px'
        this.$refs.mappMain.$el.style.left = '280px'
      } else {
        this.$refs.msidebar.$el.style.width = '150px'
        this.$refs.mappMain.$el.style.left = '150px'
      }
    }
  }
}

export const hideSiderbarMix = {
  inject: ['appContainer'],
  mounted () {
    this.hideSiderbar()
  },
  methods: {
    hideSiderbar () {
      this.appContainer.msidebar.$el.style.width = '150px'
      this.appContainer.mappMain.$el.style.left = '150px'
    }
  }
}

export const showSiderbarMix = {
  inject: ['appContainer'],
  mounted () {
    this.showSiderbar()
  },
  methods: {
    showSiderbar () {
      this.appContainer.msidebar.$el.style.width = '280px'
      this.appContainer.mappMain.$el.style.left = '280px'
    }
  }
}
