export default {
  pageTransition: {
    name: null,
    mode: null
  },
  middleware (to, from) {
    const transition = to.query.t || null

    to.meta.pageTransition.name = transition
    to.meta.pageTransition.mode = null
    from.meta.pageTransition.name = transition
    from.meta.pageTransition.mode = null
  }
}