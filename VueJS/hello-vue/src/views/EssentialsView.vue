<script setup>
import WithoutScriptSetup from "../components/essentials/WithoutScriptSetup.vue";
import WithScriptSetup from "../components/essentials/WithScriptSetup.vue";
import ReactivityFundamentals from "../components/essentials/ReactivityFundamentals.vue";
import ComputedProperties from "../components/essentials/ComputedProperties.vue";
import ClassAndStyleBindings from "../components/essentials/ClassAndStyleBindings.vue";
import ListRendering from "../components/essentials/ListRendering.vue";
import EventHandling from "../components/essentials/EventHandling.vue";
import FormInputBindings from "../components/essentials/FormInputBindings.vue";
import ComponentsBasics from "../components/essentials/ComponentsBasics.vue";
import Watchers from "../components/essentials/Watchers.vue";
import TemplateRefs from "../components/essentials/TemplateRefs.vue";
import Composables from "../components/reusability/Composables.vue";
</script>

<template>
  <h1>Essentials</h1>

  <WithoutScriptSetup />
  <WithScriptSetup />
  <hr />
  <ReactivityFundamentals />
  <hr />
  <ComputedProperties />
  <hr />
  <ClassAndStyleBindings />
  <hr />
  <ListRendering />
  <hr />
  <EventHandling />
  <hr />
  <FormInputBindings />
  <hr />
  <ComponentsBasics />
  <hr />
  <Watchers />
  <hr />
  <TemplateRefs />
</template>
