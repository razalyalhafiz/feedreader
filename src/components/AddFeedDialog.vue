<template>
  <v-layout
    row
    justify-center
  >
    <v-dialog
      v-model="dialog"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-card-title>
          <span
            class="headline"
            primary-title
          >Add Feed</span>
        </v-card-title>
        <v-card-text>
          <v-container
            grid-list-md
            class="pa-0"
          >
            <v-form
              ref="form"
              v-model="valid"
            >
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    type="url"
                    ref="feedUrl"
                    label="Feed URL"
                    v-if="dialog"
                    v-model="feedUrl"
                    :rules="urlRules"
                    :error="urlError"
                    @keyup.enter="add"
                    autofocus
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :disabled="isDisabled"
            @click="add"
          >Add</v-btn>
          <v-btn
            color="blue darken-1"
            flat
            @click="cancel"
          >Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: ["dialog"],
  data() {
    return {
      isDisabled: true,
      valid: true,
      feedUrl: "",
      urlError: false,
      urlRules: []
    }
  },
  watch: {
    feedUrl: function (val) {
      this.isDisabled = !this.checkUrlValidity(val)
    }
  },
  methods: {
    init() {
      Object.assign(this.$data, this.$options.data())
    },
    cancel() {
      this.$emit("hideDialog")
    },
    add() {
      if (this.checkDuplicateUrl()) {
        this.$emit("addFeed", this.feedUrl)
      }
    },
    checkUrlValidity(val) {
      if (!val) {
        this.urlError = true
        this.urlRules = ["Enter the feed URL."]
        return false
      } else if (!this.isValidUrl(val)) {
        this.urlError = true
        this.urlRules = ["Enter a valid URL."]
        return false
      }

      this.urlError = false
      this.urlRules = []
      return true
    },
    isValidUrl(val) {
      var re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
      return re.test(val)
    },
    checkDuplicateUrl() {
      let feeds = this.$store.state.feeds
      if (feeds.length > 0) {
        if (
          feeds.findIndex(feed => {
            return feed.url === this.feedUrl
          }) >= 0
        ) {
          this.urlError = true
          this.urlRules = ["URL already exists."]
          return false
        }
      }

      return true
    }
  }
}
</script>
