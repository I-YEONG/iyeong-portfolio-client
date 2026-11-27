export const AUTOMATIC_CHECK_DELAY = 500;
const browserTimers = {
    setTimeout: (callback, delay) => globalThis.setTimeout(callback, delay),
    clearTimeout: (handle) => globalThis.clearTimeout(handle),
};
/** 입력 세대별 타이머를 소유해 취소된 콜백도 새 입력을 확인하지 못하게 한다. */
export class AutomaticValidation {
    timers;
    tasks = new Map();
    generation = 0;
    constructor(timers = browserTimers) {
        this.timers = timers;
    }
    fields() {
        return [...this.tasks.keys()];
    }
    cancel(field) {
        const task = this.tasks.get(field);
        if (task)
            this.timers.clearTimeout(task.handle);
        this.tasks.delete(field);
        this.generation += 1;
    }
    cancelAll() {
        for (const field of this.tasks.keys())
            this.cancel(field);
    }
    schedule(field, check) {
        this.cancel(field);
        const generation = this.generation;
        const handle = this.timers.setTimeout(() => {
            if (this.tasks.get(field)?.generation !== generation)
                return;
            this.tasks.delete(field);
            check();
        }, AUTOMATIC_CHECK_DELAY);
        this.tasks.set(field, { handle, generation });
    }
}
