<template>
  <v-container>
    <div v-if="articles.length === 0">
      <h1>Welcome to the FeedReader.</h1>
      <p class="subheading font-weight-regular">
        This is a Vue.js application to read & manage RSS feeds with charting functionality.
      </p>
      <p class="subheading font-weight-regular">
        To begin using the FeedReader, add your first feed by clicking the "+" button in the navigation bar above.
      </p>
    </div>
    <div
      v-else
      v-for="article in selectedFeedArticles"
      :key="article.guid"
    >
      <ArticleCard :article="article" />
    </div>
  </v-container>
</template>
<script>
import ArticleCard from "@/components/ArticleCard"
import { mapState, mapGetters } from "vuex"

export default {
  components: {
    ArticleCard
  },
  computed: {
    ...mapState(["articles"]),
    ...mapGetters(["selectedFeedArticles"])
  }
}
</script>
