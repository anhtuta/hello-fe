import { ref, computed } from "vue";

// This composable accepts a normal list, not a reactive list
export const useCycleList1 = (list: any[]) => {
  // 👇 Define a ref to keep track of the active index
  const activeIndex = ref(0);

  // 👇 reactive `state` is based on the activeIndex
  const state = computed(() => list[activeIndex.value]);

  function next() {
    // if the `state` is the last item, start from the beginning of the list
    if (activeIndex.value === list.length - 1) {
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
      activeIndex.value = list.length - 1;
    } else {
      // otherwise just decrement the activeIndex by 1 
      activeIndex.value -= 1;
    }
  }

  return {
    state1: state, // This will be reactive data. It’s a single item within the array. It’s the “active” item in the list that we’re cycling through
    next1: next, // function allows the consumer of the composable to advance to the next item in the list
    prev1: prev // function allows going backwards through the list
  }
}
