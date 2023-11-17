<template>
  <div class="tracker-container">
    <t-card v-if="now.enable">
      <div class="current-tracker">
        <div class="entry">
          <h3>{{ now.data.description }}</h3>
          <h2>{{ now.time }}</h2>
          <div class="tag">
            <t-icon name="tag" />
            <span>{{ now.data.tags[0] }}</span>
          </div>
        </div>
        <t-button shape="circle" size="large" @click="stopEntire">
          <template #icon>
            <t-icon name="stop" />
          </template>
        </t-button>
        <t-popconfirm :visible="deletePopup"
                      theme="danger"
                      content="Confirm to delete current runner entire?"
                      @confirm="deleteRunning"
                      @cancel="deletePopup = false">
          <t-button shape="circle" size="large" @click="deletePopup = true">
            <template #icon>
              <t-icon name="delete" />
            </template>
          </t-button>
        </t-popconfirm>
      </div>
    </t-card>

    <div class="tracker-list">
      <t-card v-for="entity in quickTracker">
        <div class="quick-tracker-entity">
          <div class="entity-info">
            <h4>{{entity.description}}</h4>
            <div class="tag">
              <t-icon name="tag" />
              <span>{{entity.tags[0]}}</span>
            </div>
          </div>
          <t-button shape="circle" @click="startEntireHandle(entity)">
            <template #icon>
              <t-icon name="play" />
            </template>
          </t-button>
        </div>
      </t-card>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {deleteEntire, getCurrentTimeEntire, startEntire, stopTimeEntire} from "../api/toggl.js";
import {getTimeFormat} from "../utils/baseUtils.js";
import {DialogPlugin} from "tdesign-vue-next";

let searchTimer = -1
const now = ref({
  enable: false,
  timer: -1,
  data: {
    start: "2023-10-17T08:11:57+00:00"
  },
  time: "00:00:00"
})
const deletePopup = ref(false)
const props = defineProps({
  quickTracker: {
    type: Array,
    default: [],
    required: true
  }
})

const emit = defineEmits(['stop'])

const stopEntire = () => {
  const workspaceId = now.value.data.workspace_id
  const id = now.value.data.id
  if (workspaceId && id) {
    stopTimeEntire(workspaceId, id).then(res => {
      clearRunning()
      emit("stop")
    })
  }
}

/**
 * Start entire
 * @param {Object} entire entire obj
 */
const startEntireHandle = entire => {
  entire.start = new Date().toISOString()
  entire.stop = null
  entire.duration = -1
  entire.at = new Date().toISOString()
  entire.created_with = new Date().toISOString()
  console.log(entire)
  startEntire(entire).then(res => {
    currentEntireFound()
  })
}

const currentEntireFound = () => {
  getCurrentTimeEntire().then(d => {
    if (d) {
      now.value.data = d
      now.value.enable = true
      if (now.value.timer < 0) {
        now.value.timer = setInterval(countTimer, 1000)
      }
    } else {
      if (now.value.timer >= 0) {
        clearRunning()
      }
    }
  })
}

const countTimer = () => {
  if (!now.value.enable) return
  const time = (new Date - new Date(now.value.data.start)) / 1000
  now.value.time = getTimeFormat(parseInt(time.toString()))
}

const clearRunning = () => {
  // Disable Card
  now.value.enable = false
  // Clear Timer
  if (now.value.timer >= 0) {
    clearInterval(now.value.timer)
    now.value.timer = -1
  }
  // Clear Data
  now.value.data = null
}

const deleteRunning = () => {
  const workspaceId = now.value.data.workspace_id
  const id = now.value.data.id
  if (workspaceId && id) {
    deleteEntire(workspaceId, id).then(res => {
      console.log(res)
      clearRunning()
    })
  }
  emit("stop")
}

defineExpose({
  currentEntireFound
})
</script>

<style scoped>
.tracker-container {
  width: 300px;
  height: 512px;
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.current-tracker {
  display: flex;
  align-items: center;
  gap: 5px;
}

.current-tracker .entry {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.current-tracker .entry h2,
.current-tracker .entry h3 {
  margin: 0;
}

.current-tracker .entry .tag {
  margin: 0;
  display: flex;
  align-items: center;
}

.tracker-list {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
}


.quick-tracker-entity {
  display: flex;
  align-items: center;
}

.entity-info {
  flex: 1;
}

.entity-info h4 {
  margin: 0;
  font-weight: bold;
}

.entity-info .tag {
  color: #999999;
}
</style>
