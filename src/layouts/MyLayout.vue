<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="taskbar-color">
        <div>
          <q-btn
            flat
            dense
            round
            @click="$router.push('/')"
            icon="map"
            aria-label="Map View"
          />
        </div>

        <div class="col text-center">
          <div class="custom-frame">
            <div class="custom-frame-wrapper">
              <div class="custom-frame-gradient">
                Monastery Mapper
              </div>
            </div>
          </div>
        </div>

        <div>
          <q-btn
            flat
            dense
            round
            @click="$router.push('/list')"
            icon="list"
            aria-label="List View"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MyLayout'
}
</script>

<style lang="scss">
.taskbar-color {
  background: $taskbar-color;
  background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.3));
}
.custom-frame {
  position: absolute;
  top: -140px;
  left: calc(50% - 100px);
  width: 200px;
  height: 200px;
  border-radius: 46%;
  background: $frame-inner-border-color;
  z-index: 10;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  border: 8px double $frame-outter-border-color;
  overflow: hidden;
  .custom-frame-wrapper {
    width: 100%;
    height: 100%;
    background: $frame-color;
    .custom-frame-gradient {
      width: 100%;
      height: 100%;
      background-image: radial-gradient(rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0.7));
    }
  }
}
</style>
