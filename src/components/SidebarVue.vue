<template>
   <div class="settingsBtn">
    <b-button @click="$emit('sidebar-toggled', !showSidebar)">Settings</b-button>
    <b-sidebar v-model="isSidebarToggled" right shadow title="">
      <div class="px-3 py-2">
        <p>Select your variables
          {{ index }}
          {{ selectedItems }}
        </p>
         <b-form-checkbox
            v-for="(item,index) in variables"
            :key="index"
            v-model="selectedItems"
            name="checkbox-1"
            :value="index"
            :disabled="selectedItems.length == 2 && !selectedItems.includes(index)"
        >
         {{ item }}
        </b-form-checkbox>

      </div>
    </b-sidebar>
    
   </div>

</template>

<script>
import { BSidebar, BButton, BFormCheckbox } from 'bootstrap-vue'

export default {
    props: [ 'variables', 'showSidebar' ],
    components: {
  BButton, BSidebar, BFormCheckbox
},
data() {
    return{
    }
  },
  computed: {
    isSidebarToggled: {
      get () {
        return this.showSidebar // TRUE / FALSE
      },
      set (val) {
        this.$emit('sidebar-toggled', val)
      },
      },
      selectedItems: {
          get() { return this.$store.state.vars },
          set(value) { this.$store.commit('setVars', value)},
  }
}    
};
</script>