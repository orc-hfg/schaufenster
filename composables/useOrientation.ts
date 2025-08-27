import { ref, onMounted, onUnmounted } from 'vue'

export function useOrientation() {
  const orientation = ref<'portrait' | 'landscape'>('portrait')

  const updateOrientation = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    if (width > height) {
        orientation.value = 'landscape'
    } else {
        orientation.value = 'portrait'
    }
  }

  onMounted(() => {
    updateOrientation()
    window.addEventListener('resize', updateOrientation)
    window.addEventListener('orientationchange', updateOrientation)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateOrientation)
    window.removeEventListener('orientationchange', updateOrientation)
  })

  return { orientation }
}


/**
 * Andere Möglichkeiten, den Landscape-Modus zu blockieren
 * =======================================================
 * 
 * NICHT MÖGLICH: Screen Orientation API: screen.orientation.lock()
 * - wird von Safari und iOS Safarinicht unterstützt
 * - funktioniert nur im Vollbildmodus (z. B. via Fullscreen API) 
 * https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock
 * 
 * 
 * MÖGLICH: CSS Overlay / CSS only
 * Aber manche Browser interpretieren die Orientierung nicht immer konsistent. 
 * iOS Safari bezieht die Browser-UI (Adressleiste, Bottom-Bar) in die Berechnung ein. Dadurch wird manchmal „Portrait“ gemeldet, obwohl der Screen faktisch quer ist.
 * @media screen and (orientation: landscape)
 *   .overlay
 *     display: block;
 * 
 * MÖGLICH: JS screen.orientation API
 * Aber die Composable-Variante ist in unserem Projekt besser geeignet.
 * screen.orientation.addEventListener("change", () => {
 *   if (screen.orientation.type.startsWith("landscape")) {
 *     // z. B. Overlay anzeigen
 *   }
 * });
 * 
 */