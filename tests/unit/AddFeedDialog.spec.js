import { expect } from "chai"
import { shallowMount } from "@vue/test-utils"
import { VALID_URLS, INVALID_URLS } from "./test-urls"
import AddFeedDialog from "@/components/AddFeedDialog.vue"

const wrapper = shallowMount(AddFeedDialog)
var url, result

describe("AddFeedDialog.vue", () => {
  describe("Methods", () => {
    describe("checkUrlValidity", () => {
      it("should return false if url is empty string", () => {
        url = ""
        result = wrapper.vm.checkUrlValidity(url)
        expect(result).to.be.false
      })
      describe("should return false if url is invalid", () => {
        INVALID_URLS.forEach(value => {
          it(`should return false if url is ${value}`, () => {
            result = wrapper.vm.checkUrlValidity(value)
            expect(result).to.be.false
          })
        })
      })
      describe("should return true if url is valid", () => {
        VALID_URLS.forEach(value => {
          it(`should return true if url is ${value}`, () => {
            result = wrapper.vm.checkUrlValidity(value)
            expect(result).to.be.true
          })
        })
      })
    })
  })
})
