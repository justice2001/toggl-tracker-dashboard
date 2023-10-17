<template>
  <div class="tracker-container">
    <t-card v-if="now.enable">
      <div class="current-tracker">
        <div class="entry">
          <h3>语法</h3>
          <h2>00:12:12</h2>
          <div class="tag">
            <t-icon name="tag" />
            <span>英语</span>
          </div>
        </div>
        <t-button shape="circle" size="large">
          <template #icon>
            <t-icon name="play" />
          </template>
        </t-button>
      </div>
    </t-card>

    <div class="tracker-list">
      <t-card v-for="entity in quickTracker">
        <div class="quick-tracker-entity">
          <div class="entity-info">
            <h4>{{entity.description}}</h4>
            <div class="tag">
              <t-icon name="tag" />
              <span>{{entity.tag}}</span>
            </div>
          </div>
          <t-button shape="circle">
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
import {ref} from "vue";

const now = ref({
  enable: true
})
const quickTracker = ref([
  {description: "语法", tag: "英语", id: 123456},
  {description: "单词", tag: "英语", id: 1212},
  {description: "高等数学", tag: "数学", id: 1234},
  {description: "徐涛", tag: "政治", id: 1223}
])
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
