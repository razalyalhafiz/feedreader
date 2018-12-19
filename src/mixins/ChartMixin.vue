<script>
export default {
  methods: {
    getRandomColors(total) {
      let colors = []
      for (let i = 0; i < total; i++) {
        let r = Math.floor(Math.random() * 256).toString(16)
        let g = Math.floor(Math.random() * 256).toString(16)
        let b = Math.floor(Math.random() * 256).toString(16)
        r = r.length === 2 ? r : "0" + r
        g = g.length === 2 ? g : "0" + g
        b = b.length === 2 ? b : "0" + b
        let color = `#${r}${g}${b}`

        colors.push(color)
      }
      return colors
    }
  }
}
</script>
