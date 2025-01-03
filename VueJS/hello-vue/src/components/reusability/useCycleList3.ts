import { type MaybeRefOrGetter, ref, toRef, computed, watch } from "vue";

// This composable accepts Non-Reactive AND Reactive Argument
export const useCycleList3 = (list: MaybeRefOrGetter<string[]>) => {
  // 👇 Define a ref to keep track of the active index
  const activeIndex = ref(0);

  // calling toRef normalizes the list to a ref (no matter how it was passed)
  const reactiveList = toRef(list);

  // 👇 reactive `state` is based on the activeIndex
  const state = computed(() => reactiveList.value[activeIndex.value]);

  function next() {
    // if the `state` is the last item, start from the beginning of the list
    if (activeIndex.value === reactiveList.value.length - 1) {
      activeIndex.value = 0;
    } else {
      // otherwise just increment the activeIndex by 1 
      activeIndex.value += 1;
    }
  }

  // 👇 the prev function
  function prev() {
    // if the `state` is the first item, wrap to end end 
    if (activeIndex.value === 0) {
      activeIndex.value = reactiveList.value.length - 1;
    } else {
      // otherwise just decrement the activeIndex by 1 
      activeIndex.value -= 1;
    }
  }

  // 👇 finally, since the list can change now, let's run a little cleanup on the activeIndex
  // if the list is changed out to something shorter than the activeIndex
  watch(reactiveList, () => {
    if (activeIndex.value >= reactiveList.value.length) {
      activeIndex.value = 0;
    }
  });

  return {
    state3: state,
    next3: next,
    prev3: prev
  }
}
