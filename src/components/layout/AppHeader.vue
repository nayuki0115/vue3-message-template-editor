<template>
  <header class="app-header">
    <div class="app-header__content">
      <h1 class="app-header__title">Message Template Editor</h1>
      <p class="app-header__description">
        Create and preview a message template before submission
      </p>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #d9e6df;
  background: rgb(255 255 255 / 86%);
  backdrop-filter: blur(12px);
}

.app-header__content {
  width: min(100%, 1200px);
  margin: 0 auto;
  padding: 20px 24px;
  min-width: 0;
}

.app-header__title {
  margin: 0;
  color: #374151;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.app-header__description {
  margin: 6px 0 0;
  color: #7b8794;
  font-size: 14px;
  line-height: 1.5;
  overflow-wrap: anywhere;
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
