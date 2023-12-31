<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import Sentence from "@/classes/Sentence.class";

const words: Sentence[] = reactive([
    { id: 0, text: 'your', placed: false },
    { id: 0, text: 'Play', placed: false },
    { id: 0, text: 'friends', placed: false },
    { id: 0, text: 'with', placed: false },

    { id: 1, text: 'rubs', placed: false },
    { id: 1, text: 'love', placed: false },
    { id: 1, text: 'belly', placed: false },
    { id: 1, text: 'Dogs', placed: false },

    { id: 2, text: 'cream', placed: false },
    { id: 2, text: 'I', placed: false },
    { id: 2, text: 'ice', placed: false },
    { id: 2, text: 'like', placed: false },

    { id: 3, text: 'melodies', placed: false },
    { id: 3, text: 'sing', placed: false },
    { id: 3, text: 'Birds', placed: false },
    { id: 3, text: 'sweet', placed: false },

    { id: 4, text: 'Believe', placed: false },
    { id: 4, text: 'your', placed: false },
    { id: 4, text: 'in', placed: false },
    { id: 4, text: 'dreams', placed: false },
]);

const currentIndex = ref(0);

interface Line {
    wordIndex: number | null,
}

const lines: Line[] = reactive([
    { wordIndex: null },
    { wordIndex: null },
    { wordIndex: null },
    { wordIndex: null },
]);

const activeLineIndex = ref(null);
const correct = ref(false);
const falseSentence = ref(false);
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

const correctAnswers = (sentence) => {
    switch (sentence) {
        case 'Play with your friends':
            correct.value = true;
            break;
        case 'Dogs love belly rubs':
            correct.value = true;
            break;
        case 'I like ice cream':
            correct.value = true;
            break;
        case 'Birds sing sweet melodies':
            correct.value = true;
            break;
        case 'Believe in your dreams':
            correct.value = true;
            break;
    }

}


const speechStore = useTextToSpeechStore();

const result = () => {
    const sentence = lines
      .map((line) => (line.wordIndex !== null ? words[line.wordIndex].text : ''))
      .join(' ');

    correctAnswers(sentence);

    if (correct.value) {
        speechStore.playVoice(sentence + 'is the correct sentence! bravo!')

        setTimeout(() => {
            nextWords();
            correct.value = false
            falseSentence.value = false;
        }, 4000)
    }
    falseSentence.value = lines.every((word) => word.wordIndex != null);
}

const nextWords = () => {
    // take into account that 4 words have the same index, so the actual length is: length / 4 - 1
    if (currentIndex.value < words.length / 4 - 1) {
        currentIndex.value++;
        lines.forEach((item) => {
            item.wordIndex = null
        })
    } else {
        lines.forEach((item) => {
            item.wordIndex = null
        });
        words.forEach((item) => {
            item.placed = false
        })
        currentIndex.value = 0;
    }
}


</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <TitleWithSound title="Drag and drop all given words to form a valid sentence"/>

    <div class="container">
        <!--    DROP ZONES    -->
        <div class="lines">
            <div
              v-for="(line, lineIndex) in lines"
              :key="lineIndex"
              :class="['line', { 'active-line': isLineActive(lineIndex), droppable: isLineDroppable(lineIndex), 'line-correct': correct, 'line-incorrect': falseSentence && !correct }]"
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

            <!--      DISPLAY CURRENT STATE / MAX TASKS      -->

            <h3 style="margin-left: 2rem">
                {{ currentIndex + 1 }} / {{ words.length / 4 }}
            </h3>

        </div>

        <!-- WORDS -->
        <div class="words">
            <template v-for="(word, i) in words" :key="i">
                <v-card
                  v-if="word.id === currentIndex && !word.placed"
                  :draggable="!word.placed"
                  class="word-cards"
                  @dragstart="dragStart($event, i)"
                >
                    <v-card-title>
                        {{ word.text }} |
                        <v-icon color="primary" @click="speechStore.playVoice(word.text)">mdi-volume-high</v-icon>
                    </v-card-title>

                </v-card>
            </template>

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
    margin-top: 5rem;
}

.words {
    display: flex;
    gap: 0.5rem;

    &:hover {
        cursor: grab;
    }

    .word-cards {
        padding-inline: 0.75rem;
        padding-block: 0.25rem;
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
    min-height: 50px;
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

.line-correct {
    background-color: #78af78;
}

.line-incorrect {
    background-color: lightcoral;
}
</style>
