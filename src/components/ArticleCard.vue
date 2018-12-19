<template>
  <v-container
    fluid
    class="pb-0"
  >
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex xs12>
          <v-card>
            <v-card-title primary-title>
              <h3 class="headline mb-0">{{ article.title }}</h3>
            </v-card-title>
            <v-card-text>
              <p>{{ article.pubDate }}</p>
              <span v-html="article.description"></span>
            </v-card-text>
            <v-card-actions>
              <a
                :href="article.link"
                target="_blank"
                flat
                color="orange"
              >Read more...</a>
              <v-spacer></v-spacer>
              <p class="red black--text">{{ article.feedTitle }}</p>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
export default {
  name: "FeedCard",
  props: ["article"]
}
</script>