/**
 * Animation configuration constants shared across components.
 * These values control the batched animation behavior for studio markers.
 */

/**
 * Number of studio markers to animate simultaneously in each batch.
 * Batching improves performance by reducing simultaneous renders.
 */
export const BATCH_SIZE = 5;

/** Delay in seconds between animation batches. */
export const BATCH_DELAY = 0.5;

/** Duration in seconds for each marker's entrance animation. */
export const ANIMATION_DURATION = 6;

/** Pause duration in seconds before restarting the animation loop (screensaver only). */
export const LOOP_PAUSE = 2;
