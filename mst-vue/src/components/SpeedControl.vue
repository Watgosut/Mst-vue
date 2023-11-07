<template>
    <div>
        <input type="range" v-model="highlightSpeed" min="1" max="10" style="width: 50%" @change="clearHighlight" />
        <button @click="startHighlight">开始高亮</button>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
    props: ['selectedLinks'],
    name: "SpeedControl",
    data() {
        return {
            highlightSpeed: 1 // 默认高亮速度为1
        }
    },
    methods: {
        clearHighlight() {
            const selectedLink = d3.selectAll(".highlighted");
            selectedLink.classed("highlighted", false);
            this.$emit('update:highlightedLinks', null, false);
        },
        startHighlight() {
            let index = 0;
            const highlightLink = (index) => {
                if (index < this.selectedLinks.length) {
                    const linkId = this.selectedLinks[index];
                    const selectedLink = d3.select("#link-" + linkId);
                    selectedLink.classed("highlighted", true);
                    setTimeout(() => {
                        // selectedLink.classed("highlighted", false);
                        highlightLink(index + 1);
                    }, 1000 / this.highlightSpeed);
                }
            };
            highlightLink(index);
        }
    }
}
</script>

<style scoped>

</style>
