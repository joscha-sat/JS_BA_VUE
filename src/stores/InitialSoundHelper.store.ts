import { defineStore } from 'pinia';
import bear from '@/assets/images/tasks/initialSound/bear.png';
import panda from '@/assets/images/tasks/initialSound/panda.png';
import butterfly from '@/assets/images/tasks/initialSound/butterfly.png';
import balloon from '@/assets/images/tasks/initialSound/balloon.png';
import pizza from '@/assets/images/tasks/initialSound/pizza.png';

export const useInitialSoundHelperStore = defineStore('initialSoundHelper', {
    state: () => ({
        images: [
            { id: 0, src: bear, text: 'bear', letter: 'b' },
            { id: 0, src: panda, text: 'panda', letter: 'p' },
            { id: 0, src: butterfly, text: 'butterfly', letter: 'b' },
            { id: 0, src: balloon, text: 'balloon', letter: 'b' },
            { id: 0, src: pizza, text: 'pizza', letter: 'p' },

            { id: 1, src: panda, text: 'bear', letter: 'b' },
            { id: 1, src: panda, text: 'panda', letter: 'p' },
            { id: 1, src: butterfly, text: 'butterfly', letter: 'b' },
            { id: 1, src: balloon, text: 'balloon', letter: 'b' },
            { id: 1, src: pizza, text: 'pizza', letter: 'p' },
        ],
    }),

    // GETTER -------------------------------------------------------------------- //>
    getters: {},

    // ACTIONS ------------------------------------------------------------------- //>
    actions: {},
});
