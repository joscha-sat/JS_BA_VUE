<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>

const words = reactive([
    { text: 'This', placed: false },
    { text: 'an', placed: false },
    { text: 'example', placed: false },
]);

const lines = reactive([
    { wordIndex: null },
    { wordIndex: null },
    { wordIndex: null },

]);

const activeLineIndex = ref(null);
const isSentenceValid = ref(false);
const correct = ref(false);
const draggedLineIndex = ref(null);

const dragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index.toString());
};

const drop = (event, lineIndex) => {
    event.preventDefault();
    const wordIndex = parseInt(event.dataTransfer.getData('text/plain'));
    const word = words[wordIndex];

    const currentLineIndex = lines.findIndex((line) => line.wordIndex === wordIndex);

    // If the line is empty, place the word on it
    if (lines[lineIndex].wordIndex === null) {
        // Remove word from previous line if it was already placed
        if (currentLineIndex !== -1) {
            lines[currentLineIndex].wordIndex = null;
            words[wordIndex].placed = false;
        }

        lines[lineIndex].wordIndex = wordIndex;
        word.placed = true;
    } else {
        // Swap positions with the word in the current line
        lines[currentLineIndex].wordIndex = lines[lineIndex].wordIndex;
        lines[lineIndex].wordIndex = wordIndex;
        words[lines[currentLineIndex].wordIndex].placed = true;
        words[wordIndex].placed = true;
    }
    activeLineIndex.value = null;
    result();
};

const clearLine = (lineIndex) => {
    const wordIndex = lines[lineIndex].wordIndex;
    lines[lineIndex].wordIndex = null;
    words[wordIndex].placed = false;

    // Check if the sentence is still valid after clearing the line
    isSentenceValid.value = lines.every((line) => line.wordIndex !== null);
};

const dragEnter = (lineIndex) => {
    activeLineIndex.value = lineIndex;
    draggedLineIndex.value = lineIndex;
};

const dragLeave = (lineIndex) => {
    if (activeLineIndex.value === lineIndex) {
        activeLineIndex.value = null;
    }
    if (draggedLineIndex.value === lineIndex) {
        draggedLineIndex.value = null;
    }
};

const isLineActive = (lineIndex) => {
    return activeLineIndex.value === lineIndex;
};

const isLineDroppable = (lineIndex) => {
    return draggedLineIndex.value === lineIndex;
};


const result = (): boolean => {
    const sentence = lines
      .map((line) => (line.wordIndex !== null ? words[line.wordIndex].text : ''))
      .join(' ');

    if (sentence === 'This an example') correct.value = true
}
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <h1 style="text-align: center">DRAG AND DROP TO FORM A SENTENCE</h1>

    <div class="container">
        <!--    DROP ZONES    -->
        <div class="lines">
            <div
              v-for="(line, lineIndex) in lines"
              :key="lineIndex"
              :class="['line', { 'active-line': isLineActive(lineIndex), droppable: isLineDroppable(lineIndex) }]"
              @dragenter="dragEnter(lineIndex)"
              @dragleave="dragLeave(lineIndex)"
              @drop="drop($event, lineIndex)"
              @dragover.prevent
            >
        <span
          v-if="line.wordIndex !== null"
          draggable="true"
          @click="clearLine(lineIndex)"
          @dragstart="dragStart($event, line.wordIndex)"
        >
          {{ words[line.wordIndex].text }}
        </span>
            </div>
        </div>

        <!-- WORDS -->
        <div class="words">
            <v-card
              v-for="(word, i) in words"
              :key="i" :draggable="!word.placed"
              class="word-cards"
              @dragstart="dragStart($event, i)"
            >
                <v-card-title v-if="!word.placed">
                    {{ word.text }}
                </v-card-title>
            </v-card>
        </div>
    </div>


    Feedback: {{ correct }}


</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    min-height: 50dvh;
}

.words {
    display: flex;
    gap: 0.5rem;

    &:hover {
        cursor: grab;
    }

}

.lines {
    display: flex;
    gap: 0.5rem;
}

.line {
    flex: 1;
    border: 2px dashed #ccc;
    width: 175px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    position: relative;
}

.line.active-line {
    background-color: lightblue;
}

.line span {
    cursor: pointer;
}

.line::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 2px dashed #aaa;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.line.active-line::before {
    opacity: 1;
}
</style>