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
export function useFetch1(url) {
  const data1 = ref(null);
  const error1 = ref(null);

  const fetchData = async () => {
    // reset state before fetching..
    data1.value = null;
    error1.value = null;
    const urlValue = toValue(url);

    try {
      // artificial delay / random error
      await timeout();

      // If use fetch(toValue(url)), it will not re-trigger the fetch. Why???
      fetch(urlValue)
        .then((res) => res.json())
        .then((json) => (data1.value = json))
        .catch((err) => (error1.value = err));
    } catch (e) {
      error1.value = e;
    }
  };

  // any reactive dependencies accessed during the toValue() normalization are tracked by the watcher
  watchEffect(() => {
    fetchData();
  });

  return { data1, error1 };
}

// artificial delay
function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const ran = Math.random();
      console.log("ran = ", ran);
      if (ran > 0.4) {
        resolve();
      } else {
        reject(new Error("Random Error: " + ran));
      }
    }, 300);
  });
}
