// Scroll manager for cross-route section navigation
let pendingTarget: string | null = null;
const registeredSections: Map<string, HTMLElement> = new Map();

export const scrollManager = {
  setPendingTarget(sectionId: string) {
    pendingTarget = sectionId;
  },

  registerSection(sectionId: string, element: HTMLElement | null) {
    if (!element) {
      registeredSections.delete(sectionId);
      return;
    }

    // Store the element
    registeredSections.set(sectionId, element);

    // If this is the pending target, scroll to it immediately
    if (pendingTarget === sectionId) {
      // Small delay to ensure smooth scrolling after route transition
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      });
      pendingTarget = null;
    }
  },

  consumePendingTarget(): string | null {
    const target = pendingTarget;
    pendingTarget = null;
    return target;
  },

  scrollToSection(sectionId: string) {
    const element = registeredSections.get(sectionId);
    if (element) {
      requestAnimationFrame(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      });
      return true;
    }
    // If section not registered yet, set it as pending
    // It will scroll when the section registers
    pendingTarget = sectionId;
    return false;
  },

  clear() {
    pendingTarget = null;
    registeredSections.clear();
  },

  // For debugging/testing
  getRegisteredSections() {
    return Array.from(registeredSections.keys());
  }
};
