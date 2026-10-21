/**
 * Animation 4: Orbital Trace (Cinematic Orbital Comets + SVG Tracing)
 * Standardized module interface:
 * - mount(container): Builds DOM, initializes engine, binds listeners, starts reveal
 * - unmount(): Cleans up engine, removes all event listeners
 */

import { OrbitalTraceEngine } from './orbitalTraceEngine.js';
import './style.css';

export class Animation4Module {
  constructor() {
    this.container = null;
    this.engine = null;

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.boundHandlers = {};
  }

  mount(container) {
    this.container = container;

    // Semantic HTML Layout - Clean, pure brand animation without controls or replay buttons
    container.innerHTML = `
      <div class="anim4-root">
        <!-- Canvas Layer (Deep gradient, ambient stardust, dual orbital comets) -->
        <canvas class="anim4-canvas"></canvas>

        <!-- SVG Tracing Mount Container -->
        <div class="anim4-svg-container"></div>

        <!-- Brand Typography -->
        <section class="anim4-typography-layer" aria-live="polite">
          <h1 class="anim4-wordmark">
            <span>e</span><span>Cell</span> <span>MSIT</span>
          </h1>
          <p class="anim4-tagline">IDEATE. INSPIRE. INVEST.</p>
        </section>
      </div>
    `;

    // Cache elements
    this.canvas = container.querySelector('.anim4-canvas');
    this.svgContainer = container.querySelector('.anim4-svg-container');
    this.wordmark = container.querySelector('.anim4-wordmark');
    this.tagline = container.querySelector('.anim4-tagline');

    this.initEngine();
    this.bindEvents();
  }

  initEngine() {
    this.engine = new OrbitalTraceEngine(this.canvas, this.svgContainer, {
      onPhaseChange: (phase) => {
        // Trigger typography reveals sequentially
        if (phase === 'wordmark' || phase === 'tagline' || phase === 'hold') {
          this.wordmark?.classList.add('is-revealed');
        } else {
          this.wordmark?.classList.remove('is-revealed');
        }

        if (phase === 'tagline' || phase === 'hold') {
          this.tagline?.classList.add('is-revealed');
        } else {
          this.tagline?.classList.remove('is-revealed');
        }
      }
    });

    if (this.isReducedMotion) {
      this.engine.setReducedMotion(true);
      this.wordmark?.classList.add('is-revealed');
      this.tagline?.classList.add('is-revealed');
    } else {
      this.engine.start();
    }
  }

  bindEvents() {
    this.boundHandlers.onResize = () => {
      this.engine?.resize();
    };
    window.addEventListener('resize', this.boundHandlers.onResize);
  }

  unmount() {
    if (this.engine) {
      this.engine.destroy();
      this.engine = null;
    }

    if (this.boundHandlers.onResize) {
      window.removeEventListener('resize', this.boundHandlers.onResize);
    }

    if (this.container) {
      this.container.innerHTML = '';
      this.container = null;
    }
  }
}

export const finalAnimation = new Animation4Module();
export const animation4 = finalAnimation;
