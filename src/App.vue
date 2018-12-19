<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-tile @click="displayAllFeeds()">
          <v-list-tile-action>
            <v-icon>list_alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="yellow--text">
            All Feeds
          </v-list-tile-title>
        </v-list-tile>
        <v-list-tile
          v-for="feed in feeds"
          :key="feed.url"
          @click="selectFeed(feed)"
        >
          <v-list-tile-action @click.prevent="deleteFeed(feed)">
            <v-icon>cancel</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ feed.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      clipped-left
    >
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>FeedReader</v-toolbar-title>
      <v-spacer class="hidden-xs"></v-spacer>
      <v-btn
        icon
        title="Add Feed"
        @click="showDialog()"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-btn
        icon
        title="View Charts"
        to="/charts"
      >
        <v-icon>pie_chart</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
      <AddFeedDialog
        ref="dialog"
        :dialog="dialog"
        @addFeed="addFeed"
        @hideDialog="hideDialog"
      />
      <v-snackbar
        :color="snackbarColor"
        v-model="snackbar"
        top
      >
        {{ snackbarText }}
        <v-btn
          @click="snackbar = false"
          flat
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import AddFeedDialog from "./components/AddFeedDialog"
import { mapState } from "vuex"

export default {
  name: "App",
  components: {
    AddFeedDialog
  },
  computed: {
    ...mapState(["feeds"])
  },
  data() {
    return {
      drawer: false,
      dialog: false,
      snackbar: false,
      snackbarColor: "success",
      snackbarText: ""
    }
  },
  created() {
    this.$store.commit("loadFeeds")
    this.$store.commit("loadArticles")
    this.getFeedArticles()
  },
  methods: {
    displayAllFeeds() {
      this.setActiveFeedTitle("All Feeds")
      this.$store.dispatch("selectFeed")
      this.$router.push({ name: "feeds" })
    },
    selectFeed(feed) {
      this.setActiveFeedTitle(feed.title)
      this.$store.dispatch("selectFeed", feed)
      this.$router.push({ name: "feeds" })
    },
    setActiveFeedTitle(title) {
      Array.from(
        document.getElementsByClassName("v-list__tile__title")
      ).forEach(item => {
        item.classList.remove("yellow--text")
        if (item.innerText === title) {
          item.classList.add("yellow--text")
        }
      })
    },
    displaySnackbar(color, text) {
      this.snackbarColor = color
      this.snackbarText = text
      this.snackbar = true
    },
    addFeed(url) {
      this.$store
        .dispatch("getFeedArticles", url)
        .then(result => {
          this.hideDialog()
          this.displaySnackbar(
            "success",
            `Added ${result} articles from the RSS feed.`
          )
        })
        .catch(error => {
          this.hideDialog()
          this.displaySnackbar("error", error)
        })
    },
    getFeedArticles() {
      if (this.feeds.length == 0) return

      var count = 0
      this.feeds.forEach(feed => {
        this.$store
          .dispatch("getFeedArticles", feed.url)
          .then(result => {
            count += result
          })
          .then(() => {
            if (count > 0) {
              this.displaySnackbar(
                "success",
                `Received ${count} new articles.`
              )
            }
          })
      })
    },
    deleteFeed(feed) {
      this.$store.dispatch("deleteFeed", feed)
    },
    showDialog() {
      this.$refs.dialog.init()
      this.dialog = true
    },
    hideDialog() {
      this.dialog = false
    }
  }
}
</script>
