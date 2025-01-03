// useMouse1() composable can use useEventListener() composable
import { ref } from "vue";
import { useEventListener } from "./event";

export function useMouse1() {
  const x1 = ref(0);
  const y1 = ref(0);

  useEventListener(window, "mousemove", (event) => {
    x1.value = event.pageX;
    y1.value = event.pageY;
  });

  return { x1, y1 };
}
