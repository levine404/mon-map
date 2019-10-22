<template>
  <q-layout view="lHh Lpr lFf" class="full-height">
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

        <div
          class="col text-center"
          @click="activateLogin"
        >
          <div class="custom-frame">
            <div class="custom-frame-wrapper">
              <div class="custom-frame-gradient">
                <div class="custom-frame-title">
                  Monastery
                  <br />
                  Mapper
                </div>
                <div
                  v-if="loggedUser"
                  class="custom-frame-admin-icon"
                >
                  <q-icon name="security" />
                </div>
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

    <q-page-container class="full-height">
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>

    <q-dialog
      v-model="loginDialogOpen"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >

      <q-card
        class="bg-primary"
        style="width: 300px"
      >
        <q-card-section>
          <div class="text-h6 text-white">
            {{ loggedUser ? `Logged in as ${loggedUser}` : 'Login' }}
          </div>
        </q-card-section>

        <q-card-actions
          align="right"
          class="bg-white"
        >
          <q-btn
            v-if="!loggedUser"
            flat
            label="Login via Facebook"
            class="text-success"
            @click="facebookLogin"
          />
          <q-btn
            v-if="!loggedUser"
            v-close-popup
            flat
            class="text-negative"
            label="Cancel"
          />
          <q-btn
            v-if="loggedUser"
            v-close-popup
            flat
            class="text-positive"
            label="OK"
          />
          <q-btn
            v-if="loggedUser"
            v-close-popup
            flat
            class="text-negative"
            label="Logout"
            @click="$store.commit('logUserOut')"
          />
        </q-card-actions>
      </q-card>

    </q-dialog>

  </q-layout>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'MyLayout',
  data () {
    return {
      loginPressTimes: 0,
      lastPress: 0,
      loginDialogOpen: false
    }
  },
  computed: {
    loggedUser () {
      return this.$store.getters.loggedUser
    }
  },
  methods: {
    activateLogin () {
      if (!this.lastPress || this.lastPress < Date.now() - 1000) {
        this.lastPressTimes = 0
      }
      this.lastPress = Date.now()
      this.lastPressTimes++
      if (this.lastPressTimes >= 7) {
        this.loginDialogOpen = true
      }
    },
    facebookLogin () {
      const provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          this.$store.commit('logUserIn', result.user)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
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
      .custom-frame-title {
        font-family: Palatino, Palatino Linotype, Palatino LT STD, Book Antiqua, Georgia,serif;
        font-weight: 900;
        font-size: 140%;
        line-height: 80%;
        position: absolute;
        bottom: 14px;
        text-align: center;
        width: 100%;
        opacity: 0.9;
        color: darken($taskbar-color, 10%);
        text-shadow: 0 0 6px rgba(255, 255, 255, 0.7);
      }
      .custom-frame-admin-icon {
        position: absolute;
        bottom: 25px;
        right: 15px;
        opacity: 0.5;
        font-size: 150%;
      }
    }
  }
}
</style>
