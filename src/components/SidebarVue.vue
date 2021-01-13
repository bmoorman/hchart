<template>
   <div class="settingsBtn">
    <b-button @click="$emit('sidebar-toggled', !showSidebar)">Settings</b-button>
    <b-sidebar v-model="isSidebarToggled" right shadow title="">
      <div class="px-3 py-2">
        <p>Select your variables</p>
         <b-form-checkbox
            v-for="item in variables"
            :key="item"
            v-model="selectedItems"
            name="checkbox-1"
            :value="item"
            :disabled="selectedItems.length == 2 && !selectedItems.includes(item)"
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
      selectedItems: [],
    }
  },
  computed: {
    isSidebarToggled: {
      get () {
        return this.showSidebar // TRUE / FALSE
      },
      set (val) {
        this.$emit('sidebar-toggled', val)
      }
    }
  },
};

</script>