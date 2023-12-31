<template>
    <div class="diagram">
        <div class="dia-item" v-for="(v, k) in colorMap">
            <div class="dia-color" :style="{backgroundColor: colorGen(v)}"></div>
            <span class="dia-name">{{ k }}</span>
        </div>
    </div>
    <div class="timeline-container">
        <div class="block" :class="{big: entity}" v-for="(entity, idx) in data" :style="{backgroundColor: entity?colorGen(colorMap[entity.name]):'#999'}">
            <div class="detail" v-if="entity">
                <div>{{ entity.start }}-{{ entity.end }}</div>
                <div>{{ entity.name }}</div>
            </div>
            <div class="time" v-if="idx % 4 === 0">{{ (idx + timeRange[0] * 4) / 4 }}:00</div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, defineProps } from 'vue';

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    timeRange: {
        type: Array,
        required: false,
        default: [7, 23]
    }
})
watch(() => props.data, (v, o) => {
    const dt = []
    for (let i = props.timeRange[0]*4; i < props.timeRange[1]*4; i++) {
        dt.push(undefined)
    }

    const cm = {}
    let cdi = 0

    props.data.forEach(itm => {
        const a = itm.st.split(":")
        const b = itm.ed.split(":")

        const startHour = parseInt(a[0])
        const startMinute = parseInt(a[1])
        const endHour = parseInt(b[0])
        const endMinute = parseInt(b[1])

        const stb = ((startHour - props.timeRange[0])*4 + 1) + (startMinute / 15)
        const edb = ((endHour - props.timeRange[0])*4 + 1) + (endMinute / 15)
        for (let i = stb; i<edb;i++) {
            dt[parseInt(i)] = {
                name: itm.name,
                start: itm.st,
                end: itm.ed
            }
        }
        if (!cm[itm.name]) {
            cm[itm.name] = cdi
            cdi++
        }
    })
    colorMap.value = cm
    data.value = dt
})

const colorGen = idx => {
    return `hsl(${(360 / 20) * idx} ,90%, 60%)`
}

const colorList = ["red", "green", "blue"]
const colorMap = ref({

})

const data = ref([])
onMounted(() => {
})
</script>

<style scoped>
.timeline-container {
    display: flex;
    justify-content: center;
    padding: 20px;
    gap: 1px;
    margin-bottom: 40px;
}

.block {
    flex: 1;
    height: 20px;
    max-width: 20px;
    background-color: #999;
    position: relative;
    z-index: 1;
}

.detail {
    display: none;
    position: absolute;
    font-size: 12px;
    background-color: #fff;
    border: 1px solid #999;
    padding: 10px;
    z-index: 200;
    top: calc(100% + 3px);
    white-space: nowrap;
    flex-direction: column;
    align-items: center;
}

.block:nth-last-child(-n+20) .detail {
    right: 0;
}

.block:hover .detail {
    display: flex;
    z-index: 200;
}

.block.big:hover {
    transform: scale(1.1);
    z-index: 100;
    transition: all .2s;
}
 
.time {
    position: absolute;
    font-size: 10px;
    left: -10px;
    top: calc(100% + 12px);
    z-index: 100;
}

.time::before {
    content: '';
    height: 10px;
    width: 2px;
    bottom: 100%;
    left: 10px;
    background-color: #333;
    position: absolute;
    z-index: 100;
}

.diagram {
    display: flex;
    justify-content: space-around;
}

.dia-item {
    display: flex;
    align-items: center;
}

.dia-color {
    width: 20px;
    height: 10px;
    border-radius: 3px;
}

.dia-name {
    margin-left: 5px;
    font-size: 12px;
}
</style>