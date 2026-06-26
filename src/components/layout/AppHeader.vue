<template>
  <header class="app-header">
    <div class="app-header__content">
      <h1 class="app-header__title">Message Template Editor</h1>
      <p class="app-header__description">Create and preview a message template before submission</p>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #e5e7eb;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
}

.app-header__content {
  width: min(100%, 1200px);
  margin: 0 auto;
  padding: 20px 24px;
}

.app-header__title {
  margin: 0;
  color: #111827;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.25;
}

.app-header__description {
  margin: 6px 0 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
}

@media (max-width: 640px) {
  .app-header__content {
    padding: 16px;
  }

  .app-header__title {
    font-size: 20px;
  }
}
</style>
