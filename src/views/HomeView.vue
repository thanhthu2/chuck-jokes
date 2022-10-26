<template>
  <div class="main">
    <div class="category d-flex justify-center">
      <div
        class="category__item"
        v-for="category in getListCategory"
        :key="category"
      >
        <div class="category__item--content py-14">{{ category }}</div>
      </div>
      <div class="category__view-all" v-if="isShowBtnViewAll">
        <div class="category__item--content py-14" @click="viewAllCategory()">
          View All
        </div>
        <img alt="down icon" srcset="@/assets/icon/down-icon.png" />
      </div>
    </div>
    <hr />
    <div class="card d-flex justify-center">
      <div class="card__body" v-for="item in getListJokes" :key="item.id">
        <div class="card__body--title">
          <img
            alt="green-light"
            srcset="@/assets/icon/green-light.png"
            class="mr-4"
          />
          {{
            item.categories.length > 0 ? item.categories[0] : "Uncategorized"
          }}
        </div>
        <div class="card__body--content">{{ item.value }}</div>

        <div class="card__body--action">SEE STATS</div>
        <img
          alt="down icon"
          srcset="@/assets/icon/next-icon.png"
          class="next-icon"
        />
      </div>
    </div>

    <div class="view-more mb-24" v-if="listJokes.length > defaultTakeJoke">
      <div
        class="view-more__item--content py-14"
        @click="setDefaultTakeJokes(6)"
      >
        View More
      </div>
      <img alt="down icon" srcset="@/assets/icon/down-icon.png" />
    </div>
  </div>
</template>
<script setup lang="ts">
//#region import

import { $api } from "@/services";
import type { Result } from "@/types/jokes";
import { computed, onMounted, ref, watch } from "vue";
import { useSearchStringStore } from "@/stores/searchString";
import useJokesStore from "@/stores/jokes";
//#endregion

//#region props
//#endregion
//#region variables
const searchStringStore = useSearchStringStore();

const listCategory = ref<string[]>([]);

const listJokes = ref<Result[]>([]);

const defaultTakeCategory = ref<number>(7);

const defaultTakeJoke = ref<number>(6);

const jokeStore = useJokesStore();

//#endregion

//#region hooks
onMounted(() => {
  Promise.all([fetchCategory(), fetchJokes()]);
});
//#endregion

//#region function
const viewAllCategory = () =>
  (defaultTakeCategory.value = listCategory.value.length - 1);

const fetchCategory = async () => {
  const [err, res] = await $api.jokeService.getAllCategory();
  if (err) {
    console.error(err);
  } else {
    listCategory.value = res;
  }
};

const fetchJokes = async () => {
  const query = searchStringStore.searchString ?? "all";
  await jokeStore.fetchJokes(query);
  listJokes.value = jokeStore.listJobs;
};

const setDefaultTakeJokes = (take: number) => {
  defaultTakeJoke.value = defaultTakeJoke.value + take;
};
//#endregion

//#region computed
const isShowBtnViewAll = computed(
  () => defaultTakeCategory.value !== listCategory.value.length - 1
);

const getListCategory = computed(() =>
  listCategory.value.filter(
    (ele: string, index) => index < defaultTakeCategory.value
  )
);

const getListJokes = computed(() =>
  listJokes.value.filter((x, index) => index < defaultTakeJoke.value)
);
//#endregion

//#region reactive
watch(
  () => jokeStore.listJobs,
  () => {
    listJokes.value = [...jokeStore.listJobs];
  },
  { deep: true }
);
//#endregion
</script>

<style lang="scss" scoped>
@mixin item($bgColor, $color) {
  width: 180px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  margin-top: 10px;
  color: $color;
  background-color: $bgColor;
  border: 1px solid transparent;
  text-transform: uppercase;
  font-weight: 400;
  &--content {
    font-size: 14px;
    line-height: 14px;
  }
}
.main {
  width: 80%;
  margin: auto;
  .view-more {
    margin: auto !important;
    @include item(transparent, #cfb995);
    border: 1px solid #cfb995;
    position: relative;
    cursor: pointer;
    img {
      position: absolute;
      right: 10px;
    }
  }
  .category {
    margin: 48px auto;
    display: grid;
    grid-template-columns: 200px 200px 200px 200px 200px;
    &__item {
      @include item(red, #ffff);
      &:hover {
        border: 1px solid black;
      }
    }

    &__view-all {
      @include item(transparent, #cfb995);
      border: 1px solid #cfb995;
      position: relative;
      cursor: pointer;
      img {
        position: absolute;
        right: 10px;
      }
    }
  }
  .card {
    display: grid;
    grid-template-columns: 300px 300px 300px;
    &__body {
      height: 264px;
      background-color: #ffff;
      margin-left: 24px;
      margin-bottom: 32px;
      position: relative;
      &--title {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.25;
        text-align: start;
        margin: 16px;
        color: #030303;
      }
      &--content {
        margin: 16px;
        font-size: 14px;
        line-height: 1.57;
        text-align: start;
        color: #030303;
      }
      &--action {
        font-size: 16px;
        line-height: 16px;
        color: #cfb995;
        position: absolute;
        right: 38px;
        bottom: 24px;
      }
      .next-icon {
        position: absolute;
        right: 8px;
        bottom: 26px;
      }
      // img {

      // }
    }
  }
}
</style>
