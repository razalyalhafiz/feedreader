import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    feeds: [],
    selectedFeed: null
  },
  getters: {
    selectedFeedArticles(state) {
      if (state.articles.length === 0) return []

      let articles = []
      if (state.selectedFeed) {
        articles = state.articles.filter(article => {
          return article.feedUrl === state.selectedFeed.url
        })
      } else {
        articles = state.articles
      }

      return articles
    },
    dateChartData(state) {
      if (state.articles.length === 0) return []

      let chartData = []
      let dates = state.articles.map(article =>
        article.pubDate.substring(0, 10)
      )

      let distinctDates = [...new Set(dates)].sort()
      distinctDates.forEach(date => {
        let sum = dates.filter(d => d === date).length

        let item = {}
        item.x = date
        item.y = sum
        chartData.push(item)
      })

      return chartData
    },
    sourceChartData(state) {
      if (state.articles.length === 0) return []

      let distinctFeeds = [
        ...new Set(state.articles.map(article => article.feedTitle))
      ]
      distinctFeeds.sort((a, b) =>
        a.toLowerCase() > b.toLowerCase() ?
        1 :
        b.toLowerCase() > a.toLowerCase() ?
        -1 :
        0
      )

      let chartData = []
      distinctFeeds.forEach(feed => {
        let sum = state.articles.filter(article => article.feedTitle === feed)
          .length

        let item = {}
        item.title = feed
        item.articles = sum
        chartData.push(item)
      })

      return chartData
    }
  },
  mutations: {
    loadFeeds(state) {
      let feeds = localStorage.getItem("feeds")
      if (feeds) {
        state.feeds = JSON.parse(feeds)
      }
    },
    loadArticles(state) {
      let articles = localStorage.getItem("articles")
      if (articles) {
        state.articles = JSON.parse(articles)
      }
    }
  },
  actions: {
    getFeedArticles(context, url) {
      return new Promise((resolve, reject) => {
        const rssUrl = "https://api.rss2json.com/v1/api.json?rss_url="
        fetch(rssUrl + encodeURIComponent(url))
          .then(res => res.json())
          .then(res => {
            if (res.status === "error") {
              reject(res.message)
            }

            let totalArticles = 0
            res.items.forEach(item => {
              item.feedTitle = res.feed.title
              item.feedUrl = res.feed.url

              if (
                context.state.articles.findIndex(article => {
                  return article.guid === item.guid
                }) === -1
              ) {
                context.state.articles.push(item)
                context.state.articles.sort((a, b) =>
                  b.pubDate > a.pubDate ? 1 : a.pubDate > b.pubDate ? -1 : 0
                )
                totalArticles++
              }
            })

            if (
              context.state.feeds.findIndex(feed => {
                return feed.url === res.feed.url
              }) === -1
            ) {
              context.state.feeds.push(res.feed)
              context.state.feeds.sort((a, b) =>
                a.title.toLowerCase() > b.title.toLowerCase() ?
                1 :
                b.title.toLowerCase() > a.title.toLowerCase() ?
                -1 :
                0
              )
            }

            context.dispatch("storeFeeds")
            resolve(totalArticles)
          })
      })
    },
    deleteFeed(context, feed) {
      let pos = context.state.feeds.findIndex(f => {
        return f.url === feed.url
      })
      context.state.feeds.splice(pos, 1)
      context.state.articles = context.state.articles.filter(f => {
        return f.feedUrl != feed.url
      })
      context.dispatch("storeFeeds")
    },
    selectFeed(context, feed) {
      context.state.selectedFeed = feed
    },
    storeFeeds(context) {
      localStorage.setItem("feeds", JSON.stringify(context.state.feeds))
      localStorage.setItem("articles", JSON.stringify(context.state.articles))
    }
  }
})