<template>
   <div class="settingsBtn">
    <b-button @click="$emit('sidebar-toggled', !showSidebar)">Settings</b-button>
    <b-sidebar v-model="isSidebarToggled" right shadow title="">
      <div class="px-3 py-2">
        <p>Select your variables</p>

        {{ computedSelectedItems }}

         <b-form-checkbox
            v-for="item in variables"
            :key="item.id"
            v-model="computedSelectedItems"
            name="checkbox-1"
            :value="item"
            :disabled="computedSelectedItems.length == 2 && !computedSelectedItems.includes(item)"
            return-object
            onClick="save()"
        >
         {{ item.name }}
        </b-form-checkbox>

      </div>
    </b-sidebar>
    
   </div>

</template>

<script>
import { BSidebar, BButton, BFormCheckbox } from 'bootstrap-vue'

export default {
    props: [ 'variables', 'showSidebar', 'selectedItems' ],
    components: {
  BButton, BSidebar, BFormCheckbox
},
  computed: {
    computedSelectedItems: {
        get () {
            return this.selectedItems
        },
        set (val) {
            this.$emit('update:selectedItems', val)
        }
    },
    isSidebarToggled: {
      get () {
        return this.showSidebar // TRUE / FALSE
      },
      set (val) {
        this.$emit('sidebar-toggled', val)
      }
    }
  }
};
</script>