import { ref, toValue, watchEffect } from "vue";
// import { Ref } from "@vue/reactivity";

/**
 * Fetch data from the given URL.
 *
 * useFetch() should be able to accept a ref
 * const url = ref('/initial-url')
 * useFetch(url)
 *
 * Or accept a getter function:
 * useFetch(() => `/posts/${props.id}`)
 *
 * Then when the input changes, the fetch should be re-triggered.
 * Note: if input is String, it cannot re-trigger the fetch.
 * @param {String | Ref<any> | Function} url
 * @returns {JSON} data and error
 */
export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);

  const fetchData = () => {
    // reset state before fetching..
    data.value = null;
    error.value = null;

    // toValue() is an API added in 3.3. It is designed to normalize refs or getters into values.
    // If the argument is a ref, it returns the ref's value; if the argument is a function,
    // it will call the function and return its return value
    fetch(toValue(url))
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  };

  // any reactive dependencies accessed during the toValue() normalization are tracked by the watcher
  watchEffect(() => {
    fetchData();
  });

  return { data, error };
}
