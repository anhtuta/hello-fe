import { ref, computed, watch, type Ref } from "vue";

// We often work with reactive data, so a component may want to pass a reactive data to this composable.
// This composable accepts a reactive list
export const useCycleList2 = (list: Ref<any[]>) => {
  // 👇 Define a ref to keep track of the active index
  const activeIndex = ref(0);

  // 👇 reactive `state` is based on the activeIndex
  const state = computed(() => list.value[activeIndex.value]);

  function next() {
    // if the `state` is the last item, start from the beginning of the list
    if (activeIndex.value === list.value.length - 1) {
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
      activeIndex.value = list.value.length - 1;
    } else {
      // otherwise just decrement the activeIndex by 1 
      activeIndex.value -= 1;
    }
  }

  // 👇 finally, since the list can change now, let's run a little cleanup on the activeIndex
  // if the list is changed out to something shorter than the activeIndex
  watch(list, () => {
    if (activeIndex.value >= list.value.length) {
      activeIndex.value = 0;
    }
  });

  return {
    state2: state,
    next2: next,
    prev2: prev
  }
}
