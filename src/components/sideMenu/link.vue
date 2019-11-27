<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from "@/utils/validate";

export default {
  props: {
    to: {
      type: String,
      default: ""
    }
  },
  methods: {
    linkProps(url) {
      if (url == null || url == "") {
        return {
          is: "a",
          href: "javascript:void(0);"
        };
      }

      if (isExternal(url)) {
        return {
          is: "a",
          href: url,
          target: "_blank",
          rel: "noopener"
        };
      } else {
        return {
          is: "router-link",
          to: url
        };
      }
    }
  }
};
</script>
